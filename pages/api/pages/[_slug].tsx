import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/utils/mongodb/db-connect'
import PageModel from '@/utils/mongodb/page.model'
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

  let pageType = '_id'
  let queryValue = _slug
  if (_slug && typeof _slug === 'string' && _slug.length === 24 && /^[a-f0-9]{24}$/i.test(_slug)) {
    pageType = '_id'
    // queryValue = mongoose.Types.ObjectId(_slug)
  } else {
    pageType = 'slug'
  }
  switch (method) {
    case 'GET' /* Get a page item by its slug or id*/:
      try {
        const page = await PageModel.findOne({ [pageType]: queryValue })

        if (!page) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: page })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a page item by its slug or id */:
      try {
        console.log(req.body)

        const page = await PageModel.findOneAndUpdate({ [pageType]: queryValue }, req.body, {
          new: true,
          runValidators: true,
        })
        // const work = await WorkModel.findOneAndUpdate({ slug: _slug }, req.body, {
        //   new: true,
        //   runValidators: true,
        // })
        // console.log(page)
        if (!page) {
          return res.status(400).json({ success: false, message: 'Page not found !' })
        }
        res.status(200).json({ success: true, data: page })
        console.log('New page:', page)
      } catch (error) {
        res.status(400).json({ success: false, message: error })
      }
      break

    case 'DELETE' /* Delete a page item by its slug */:
      try {
        const deletedPage = await PageModel.deleteOne({ [pageType]: queryValue })
        if (!deletedPage) {
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
