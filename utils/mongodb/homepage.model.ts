// Source : https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose

// Source : https://gist.github.com/rashidmya/2c075330e636134f00ebe85fbb88fed8

import { models, model, Schema } from 'mongoose'

const HomepageSchema: Schema = new Schema({
  selectedWorks: {
    type: Array,
    default: [''],
  },
})

const HomepageModel = models.Homepage || model('Homepage', HomepageSchema)

export default HomepageModel
