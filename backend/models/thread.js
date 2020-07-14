const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var mongoosePaginate = require('mongoose-paginate')



const threadSchema = mongoose.Schema({
    threadName: {
      type: String,
      required:true,
      //unique: true,
      minlength: 4,
      maxlength: 20
    },
    description: String,
    date: Date, // thread luontipäivä
    lastModified:Date,
    author: String, 
    user_id: String,
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}, 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
  })

  threadSchema.set('toObject', { depopulate: false })
  threadSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  
  threadSchema.plugin(uniqueValidator)
  threadSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('Threads', threadSchema, 'threads')