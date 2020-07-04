const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const threadSchema = mongoose.Schema({
    threadName: {
      type: String,
      required:true,
      unique: true,
      minlength: 4,
      maxlength: 20
    },
    description: String,
    date: Date, // thread luontipäivä
    author: String, 
    user_id: String,
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}, 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
  })

  threadSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  threadSchema.plugin(uniqueValidator)

  module.exports = mongoose.model('Threads', threadSchema, 'threads')