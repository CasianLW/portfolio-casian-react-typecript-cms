// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import { models, model, Schema } from 'mongoose'

const PageSchema: Schema = new Schema({
  title: { type: String, required: true },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    searchImage: { type: String, required: true },
  },
})

const PageModel = models.Page || model('Page', PageSchema)

export default PageModel
