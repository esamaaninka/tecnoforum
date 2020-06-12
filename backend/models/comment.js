const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// HOX validators might work only in creation, when using schema
// e.g when updating model validations see discussion about solutions
// https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
// try whether this setting "mongoose.set('runValidators', true); "
// just before app.js connectMongo
const commentSchema = mongoose.Schema({
    comment: {
      type: String,
      required:true
    },
    author: String,
    date: Date
    //category
    //thread
  })

  commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  commentSchema.plugin(uniqueValidator)

  module.exports = mongoose.model('Comments', commentSchema, 'comment')