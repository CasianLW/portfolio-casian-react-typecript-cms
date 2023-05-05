// @/pages/api/works/index.ts

// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import type { NextApiRequest, NextApiResponse } from 'next'
var slugify = require('slugify')

// import { dbConnect, WorkModel } from '@/utils/mongodb'
// import WorkModel from '@/models/work.model'

import { IWork } from '@/@types/work'
import { dbConnect } from '@/utils/mongodb/db-connect'
import WorkModel from '@/utils/mongodb/work.model'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

type Data = {
  works?: IWork[]

  work?: IWork

  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // verification admin pour bloquer les routes
  const session = await getServerSession(req, res, authOptions)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ success: false, message: "Connectez-vous en tant qu'admin ! " })
    }
  }

  //   if (req.method === 'POST') {
  //     return res.status(201).json({ message: 'POST' })
  //   }
  if (req.method === 'POST') {
    console.log(req.body)
    try {
      await dbConnect()
      var {
        title,
        secondaryTitle,
        seo,
        slug,
        description,
        coverImage,
        secondaryImage,
        category,
        published,
        links,
        skillPoints,
        order,
      } = req.body

      // Validate request body against the WorkModel schema
      if (
        !title ||
        !secondaryTitle ||
        !seo.title ||
        !seo.description ||
        !slug ||
        !description ||
        !coverImage ||
        !secondaryImage ||
        !category ||
        !links ||
        !skillPoints ||
        !order
      ) {
        return res.status(400).json({ success: false, message: 'Missing required fields in the request body' })
      }

      if (slug && typeof slug === 'string' && slug.length === 24 && /^[a-f0-9]{24}$/i.test(slug)) {
        return res.status(400).json({ success: false, message: 'Slug invalide, format non accepté' })
      }
      var slug = slugify(slug)
      if (await WorkModel.findOne({ slug: slug })) {
        return res.status(400).json({ success: false, message: 'Ce slug est deja pris, essayez avec un autre' })
      }

      if (await WorkModel.findOne({ title: title })) {
        return res.status(400).json({ success: false, message: 'Ce titre est deja pris, essayez un autre' })
      }

      const work = await WorkModel.create({
        title,
        secondaryTitle,
        seo,
        slug,
        description,
        coverImage,
        secondaryImage,
        category,
        published,
        links,
        skillPoints,
        order,
      })
      res.status(201).json({ success: true, data: work })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, message: 'Error creating new work item' })
    }
  }

  if (req.method === 'GET') {
    try {
      dbConnect()
      const works = await WorkModel.find({})
      return res.status(200).json({ works, message: 'OK' })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default handler
