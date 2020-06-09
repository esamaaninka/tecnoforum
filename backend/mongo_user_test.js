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

  const User = mongoose.model('user', userSchema, 'user')

  /*

{"_id":
  { "$oid":"5edb910a0cfa3550a48703a9"},
    "fullname":"kalle kustaa",
    "password":"korkki",
    "email":"kallekustaa@mail.com",
    "nickname":"Gustav",
    "__v":{"$numberInt":"0"}
}
*/
  const user = new User({
    fullname: 'Pekka Pätkä',
    password: 'wilhelmiina',
    email: 'pekka@email.com',
    nickname: 'Pätkä'
  })

  user.save().then(response => {
      console.log('user saved')
  })
  .then( () => {
    //console.log('Is this the right way? ')
    mongoose.connection.close()
})



/*
const name = 'kalle kustaa'

  User
    .findOne({ fullname: `${name}` }, function (error, user) {
    console.log("Error: " + error);
    console.log("User: " + user);
    //mongoose.connection.close()
    })
   .then( () => {
      //console.log('Is this the right way? ')
      mongoose.connection.close()
  })
  */

  const id = '5edaaa175521736e1898f736'
/*
  User
    .findById(id, function (err, docs) { 
      if (err){ 
          console.log(err)
      } 
      else{ 
          console.log("Result : ", docs)
      }
    }) 
   .then( () => {
      mongoose.connection.close()
    })
  */  

 // HOX ei toimi vielä !!!! 
 /*
  User.deleteOne({id: id})
      .then(function(){ 
        console.log("Data deleted"); // Success 
      })
      .then( () => {
        mongoose.connection.close()
      })
      .catch(function(error){ 
        console.log(error); // Failure 
      }) 
  */
/*
  User.find({})
    .then(result => {
      result.forEach(n => {
         console.log(n)
      })  
      mongoose.connection.close()
    })
  */
    
    
