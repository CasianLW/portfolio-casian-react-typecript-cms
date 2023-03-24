import type { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/utils/mongodb/db-connect'
import ServiceModel from '@/utils/mongodb/service.model'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ success: false, message: "Connectez-vous en tant qu'admin ! " })
    }
  }
  if (req.method === 'POST') {
    try {
      await dbConnect()
      var { title, description, coverImage, category, order, priceDetails, showPrice, published, points } = req.body

      // Validate request body against the ServiceModel schema
      if (!title || !description || !coverImage || !category) {
        return res.status(400).json({ success: false, message: 'Missing required fields in the request body' })
      }

      if (category != 'complets' && category != 'specifics' && category != 'autre') {
        return res
          .status(400)
          .json({ success: false, message: 'Les services peuvent être que: complets, specifics ou autre.' })
      }

      if (await ServiceModel.findOne({ title: title })) {
        return res.status(400).json({ success: false, message: 'Ce titre est deja pris, essayez un autre' })
      }

      const service = await ServiceModel.create({
        title,
        description,
        coverImage,
        order,
        category,
        priceDetails,
        showPrice,
        published,
        points,
      })
      res.status(201).json({ success: true, data: service })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, message: 'Error creating new service item' })
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
