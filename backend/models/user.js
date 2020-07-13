const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator') 
// require('mongoose-type-email'); // ei toimi tämä


// HOX validators might work only in creation, when using schema
// e.g when updating model validations see discussion about solutions
// https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
// try whether this setting "mongoose.set('runValidators', true); "
// just before app.js connectMongo
// Update note PUT/FindOneAndUpdate requires context set otherwise fails for missing fields
const userSchema = mongoose.Schema({
    fullname: {
      type: String,
      required:true,
      minlength: 4,
      maxlength: 20
    },
    passwordHash: String,
    email: {
       // type: mongoose.SchemaTypes.Email,
       type: String,
        unique:true,
        required: true,
        /*validate: {
          validator: () => Promise.resolve(false),
          message: 'Email validation failed'
        }*/
        validate:{ // 
          validator: email => validator.isEmail(email),
          message: '{VALUE} is not a valid email',
          //isAsync: false // oliko tällä merkitystä kokeilin ilman ja tämän kanssa ei vaikusta update kohdalla
        }
    },
    nickname: String,
    userType: {
      type: String,
      enum : ['user','moderator','admin'],
      default: 'user'
    },
    description: String,
    date: Date, 
    lastModified:Date,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
      }
    ], 
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