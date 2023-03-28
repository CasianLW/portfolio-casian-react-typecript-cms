// @/pages/api/works/index.ts

// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import type { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/utils/mongodb/db-connect'
import PageModel from '@/utils/mongodb/page.model'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // verification admin pour bloquer les routes
  const session = await getServerSession(req, res, authOptions)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ success: false, message: "Connectez-vous en tant qu'admin ! " })
    }
  }

  if (req.method === 'POST') {
    try {
      await dbConnect()
      var { seo, title } = req.body

      // Validate request body against the WorkModel schema
      if (!seo.title || !seo.description || !seo.searchImage || !title) {
        return res.status(400).json({ success: false, message: 'Missing required fields in the request body' })
      }

      if (await PageModel.findOne({ title: title })) {
        return res.status(400).json({ success: false, message: 'Ce titre est deja pris, essayez un autre' })
      }
      const page = await PageModel.create({
        seo,
        title,
      })

      res.status(201).json({ success: true, data: page })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, message: 'Error creating new page item' })
    }
  }

  if (req.method === 'GET') {
    try {
      dbConnect()
      const pages = await PageModel.find({})
      return res.status(200).json({ pages, message: 'OK' })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default handler
