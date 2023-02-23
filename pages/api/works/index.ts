// @/pages/api/works/index.ts

// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import type { NextApiRequest, NextApiResponse } from 'next'

// import { dbConnect, WorkModel } from '@/utils/mongodb'
// import WorkModel from '@/models/work.model'

import { IWork } from '@/@types/work'
import { dbConnect } from '@/utils/mongodb/db-connect'
import WorkModel from '@/utils/mongodb/work.model'

type Data = {
  works?: IWork[]

  work?: IWork

  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (req.method === 'POST') {
  //     return res.status(201).json({ message: 'POST' })
  //   }
  if (req.method === 'POST') {
    try {
      const { title, seo, slug, description, coverImage, published } = req.body

      // Validate request body against the WorkModel schema
      if (!title || !seo.title || !seo.description || !slug || !description || !coverImage || !published) {
        return res.status(400).json({ success: false, message: 'Missing required fields in the request body' })
      }
      if (await WorkModel.findOne({ slug: slug })) {
        return res.status(400).json({ success: false, message: 'Ce slug est deja pris, essayez avec un autre' })
      }
      if (await WorkModel.findOne({ title: title })) {
        return res.status(400).json({ success: false, message: 'Ce titre est deja pris, essayez un autre' })
      }

      const work = await WorkModel.create({ title, seo, slug, description, coverImage, published })
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
