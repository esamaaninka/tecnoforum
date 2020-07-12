const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var mongoosePaginate = require('mongoose-paginate')

const commentSchema = mongoose.Schema({
    comment: {
      type: String,
      required:true
    },
    author: String,
    date: Date,
    lastModified:Date,
    user_id: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'    
      }
    ,
    //category
    thread_id:  
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
      }
    
  })

  commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  //commentSchema.set('toObject', { depopulate: false })
  commentSchema.plugin(uniqueValidator)
  commentSchema.plugin(mongoosePaginate)
  


  module.exports = mongoose.model('Comments', commentSchema, 'comment')