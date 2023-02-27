// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import { models, model, Schema } from 'mongoose'

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 99,
  },
  priceDetails: {
    type: String,
    default: 'Contact me',
  },
  showPrice: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
  },
})

const ServiceModel = models.Service || model('Service', ServiceSchema)

export default ServiceModel
