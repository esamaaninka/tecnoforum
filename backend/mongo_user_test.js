const mongoose = require('mongoose')
require('dotenv').config()

/*
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
*/
//const password = process.argv[2]

const url = process.env.MONGODB_URI
  //`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/tecnoforum_db?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    nickname: String
  })

  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const User = mongoose.model('User', userSchema, 'user')

  /*
  const user = new User({
    fullname: 'Janne Vaan',
    password: 'halitulijallaa',
    email: 'janne.v@mail.com',
    nickname: 'Jepjep'
  })

  user.save().then(response => {
      console.log('user saved')
  })
*/
/*
  const name = 'Kalle Mätitahna'

  User
    .findOne({ fullname: '${name}' }, function (error, user) {
    console.log("Error: " + error);
    console.log("User: " + user);
    //mongoose.connection.close()
    })
    //mongoose.connection.close()
    
  */
  //})

  User.find({})
    .then(result => {
      result.forEach(n => {
         console.log(n)
      })  
      mongoose.connection.close()
    })
  
    
    
