import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/utils/mongodb/db-connect'
import WorkModel from '@/utils/mongodb/work.model'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { _slug },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a work item by its slug */:
      try {
        const work = await WorkModel.findOne({ slug: _slug })

        if (!work) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: work })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a work item by its slug */:
      try {
        const work = await WorkModel.findOneAndUpdate({ slug: _slug }, req.body, {
          new: true,
          runValidators: true,
        })
        // console.log(work)
        if (!work) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: work })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a work item by its slug */:
      try {
        const deletedWork = await WorkModel.deleteOne({ slug: _slug })
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
