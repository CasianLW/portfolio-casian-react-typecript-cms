// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import { Mongoose } from 'mongoose'

declare global {
  var mongoose: {
    conn: Mongoose | null
  }
}
