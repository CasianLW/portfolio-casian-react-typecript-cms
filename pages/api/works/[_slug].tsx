import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/utils/mongodb/db-connect'
import WorkModel from '@/utils/mongodb/work.model'
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
    query: { _slug },
    method,
  } = req

  await dbConnect()

  let workType = '_id'
  let queryValue = _slug
  if (_slug && typeof _slug === 'string' && _slug.length === 24 && /^[a-f0-9]{24}$/i.test(_slug)) {
    workType = '_id'
    // queryValue = mongoose.Types.ObjectId(_slug)
  } else {
    workType = 'slug'
  }
  switch (method) {
    case 'GET' /* Get a work item by its slug or id*/:
      try {
        const work = await WorkModel.findOne({ [workType]: queryValue })
        // const work = await WorkModel.findOne({ _id: _slug })

        if (!work) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: work })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a work item by its slug or id */:
      try {
        const work = await WorkModel.findOneAndUpdate({ [workType]: queryValue }, req.body, {
          new: true,
          runValidators: true,
        })
        // const work = await WorkModel.findOneAndUpdate({ slug: _slug }, req.body, {
        //   new: true,
        //   runValidators: true,
        // })
        // console.log(work)
        if (!work) {
          return res.status(400).json({ success: false, message: 'Work not found !' })
        }
        res.status(200).json({ success: true, data: work })
      } catch (error) {
        res.status(400).json({ success: false, message: error })
      }
      break

    case 'DELETE' /* Delete a work item by its slug */:
      try {
        const deletedWork = await WorkModel.deleteOne({ [workType]: queryValue })
        if (!deletedWork) {
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
