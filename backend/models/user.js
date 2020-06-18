const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// HOX validators might work only in creation, when using schema
// e.g when updating model validations see discussion about solutions
// https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
// try whether this setting "mongoose.set('runValidators', true); "
// just before app.js connectMongo
const userSchema = mongoose.Schema({
    fullname: {
      type: String,
      required:true,
      minlength: 4,
      maxlength: 20
    },
    passwordHash: String,
    email: {
        type: String,
        required: true
    },
    nickname: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ] 
  })

  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // delete the hashed password from final, not to be revealed outside
      //delete returnedObject.password
    }
  })

  userSchema.plugin(uniqueValidator)

  module.exports = mongoose.model('Users', userSchema, 'user')