// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (!MONGODB_URI) throw new Error('MONGO_URI is not defined.')

// console.log('utils/mongodb/db-connect/index.ts > MONGODB_URI >', MONGODB_URI)

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null }

export const dbConnect = async () => {
  if (cached.conn) return cached.conn

  cached.conn = await mongoose.connect(MONGODB_URI)

  return cached.conn
}
