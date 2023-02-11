import { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jsonwebtoken')

const { ADMIN_NAME, ADMIN_PASSWORD, JWT_SECRET_KEY } = process.env

type Data = {
  token?: string
  error?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      //   const credentials = req.body
      //   const { username, password } = credentials
      const { username, password }: { username: string; password: string } = req.body

      // console.log('reponse body: ', username, password)

      if (username !== ADMIN_NAME || password !== ADMIN_PASSWORD) {
        throw new Error('Le username ou pwd ne correspond pas !')
      } else {
        const token = jwt.sign({}, JWT_SECRET_KEY, {
          expiresIn: '2 days',
        })
        res.status(200).json({ token })
      }
    } catch (error) {
      res.status(500).json({ error: 'Username ou pwd incorrect !' })
      console.log('pagesauthsigninindexx.ts > error >', error)
    }
  }
}
