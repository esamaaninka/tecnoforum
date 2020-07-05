const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const categorySchema = mongoose.Schema({
    categoryName: {
      type: String,
      required:true,
      unique: true,
      minlength: 4,
      maxlength: 20
    },
    description: String,
    date: Date, 
    author: String, 
    user_id: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Threads'
    }]
  })

  categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  categorySchema.plugin(uniqueValidator)

  module.exports = mongoose.model('Categories', categorySchema, 'categories')