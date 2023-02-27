// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import { models, model, Schema } from 'mongoose'

const WorkSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },

  slug: { type: String, required: true, unique: true },

  description: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    required: true,
  },
  secondaryImage: {
    type: String,
    required: true,
  },
  category: {
    dev: { type: Boolean, required: true, default: false },
    uxui: { type: Boolean, required: true, default: false },
    graphic: { type: Boolean, required: true, default: false },
    all: { type: Boolean, default: true },
  },
  published: {
    type: Boolean,
    default: false,
  },
})

const WorkModel = models.Work || model('Work', WorkSchema)

export default WorkModel
