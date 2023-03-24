import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/utils/mongodb/db-connect'
import ServiceModel from '@/utils/mongodb/service.model'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ success: false, message: "Connectez-vous en tant qu'admin ! " })
    }
  }
  const {
    query: { _id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a service item by its id */:
      try {
        const service = await ServiceModel.findOne({ _id: _id })

        if (!service) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: service })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a service item by its id */:
      try {
        const { category } = req.body
        if (category != 'complets' && category != 'specifics' && category != 'autre') {
          return res
            .status(400)
            .json({ success: false, message: 'Les services peuvent être que: complets, specifics ou autre.' })
        }

        const service = await ServiceModel.findOneAndUpdate({ _id: _id }, req.body, {
          new: true,
          runValidators: true,
        })
        // console.log(service)
        if (!service) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: service })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a service item by its id */:
      try {
        const deletedService = await ServiceModel.deleteOne({ _id: _id })
        if (!deletedService) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
