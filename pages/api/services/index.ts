import type { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/utils/mongodb/db-connect'
import ServiceModel from '@/utils/mongodb/service.model'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await dbConnect()
      var { title, description, coverImage, category, order, published } = req.body

      // Validate request body against the ServiceModel schema
      if (!title || !description || !coverImage || !category) {
        return res.status(400).json({ success: false, message: 'Missing required fields in the request body' })
      }

      if (category != ('complets' || 'specifics' || 'autre')) {
        return res
          .status(400)
          .json({ success: false, message: 'Les services peuvent être que: complets, specifics ou autre.' })
      }

      if (await ServiceModel.findOne({ title: title })) {
        return res.status(400).json({ success: false, message: 'Ce titre est deja pris, essayez un autre' })
      }

      const work = await ServiceModel.create({
        title,
        description,
        coverImage,
        order,
        category,
        published,
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
      const services = await ServiceModel.find({})
      return res.status(200).json({ services, message: 'OK' })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default handler
