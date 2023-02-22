const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoemSchema = new Schema({
  poem: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Poem', PoemSchema)
