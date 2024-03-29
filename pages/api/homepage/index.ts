import type { NextApiRequest, NextApiResponse } from 'next'

import { dbConnect } from '@/utils/mongodb/db-connect'
import HomepageModel from '@/utils/mongodb/homepage.model'

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
      const { selectedWorks } = req.body

      if (!selectedWorks) {
        return res.status(400).json({ success: false, message: 'Missing required fields in the request body' })
      }

      const updatedHomepage = await HomepageModel.findOneAndUpdate({}, { selectedWorks }, { upsert: true, new: true })
      res.status(201).json({ success: true, data: updatedHomepage.selectedWorks })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, message: 'Error updating homepage item', error: error })
    }
  }

  if (req.method === 'GET') {
    try {
      dbConnect()
      const homepage = await HomepageModel.find({})
      return res.status(200).json({ homepage, message: 'OK' })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default handler
