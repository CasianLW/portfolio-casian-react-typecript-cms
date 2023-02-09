import { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jwt')

const { ADMIN_NAME, ADMIN_PASSWORD, JWT_SECRET_KEY } = process.env

type Data = {
  token?: string
  error?: string
}
// interface Credentials = {
//     username: string
//     password:string
// }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      //   const credentials = req.body
      //   const { username, password } = credentials

      const { username, password }: { username: string; password: string } = req.body
      console.log('pagesauthsigninindexx.ts > credentials >', credentials)

      if (username !== ADMIN_NAME || password !== ADMIN_PASSWORD) {
        throw new Error('Le username ou pwd sont incorrectes !')
      }
    } catch (error) {
      console.log('pagesauthsigninindexx.ts > error >', error)
    }
  }
}
