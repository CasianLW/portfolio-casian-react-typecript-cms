// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import { models, model, Schema } from 'mongoose'

const HomepageSchema: Schema = new Schema({
  selectedWorks: {
    type: [
      new Schema({
        seoTitle: String,
        seoDescription: String,
        title: String,
        secondaryTitle: String,
        slug: String,
        description: String,
        secondaryImage: String,
        coverImage: { type: String, required: true },
        category: {
          dev: Boolean,
          uxui: Boolean,
          graphic: Boolean,
        },
        published: Boolean,
        order: Number,
        pointText: String,
        pointList: [String],
        links: {
          website: { published: Boolean, link: String },
          otherResource: { published: Boolean, link: String, title: String },
        },
      }),
    ],
    default: [],
  },
})

const HomepageModel = models.Homepage || model('Homepage', HomepageSchema)

export default HomepageModel
