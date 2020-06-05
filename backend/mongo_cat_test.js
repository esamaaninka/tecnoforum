const mongoose = require('mongoose')
require('dotenv').config()

////////////////////////////
// NOT WORKING YET
////////////////////////////

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

//const password = process.argv[2]

const url = process.env.MONGODB_URI
  //`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/tecnoforum_db?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const catSchema = mongoose.Schema({
    category: String,
    thread: String,
    comment: String,
    author: String,
    time: Date,
    likes: Number
  })
/*
  catSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
*/

const Cat = mongoose.model('Cat', catSchema)

const cat = new Cat({
  category: 'Callback-functions suck',    
  thread: 'Always in trouble with those',
  comment: 'Is there any better way',
  author: 'Esa Maaninka',
  date: new Date(),
  likes: 1
})

cat.save().then(response => {
  console.log('cat saved!');
//  mongoose.connection.close();
})

Cat.find({}).then(result => {
  result.forEach(n => {
    console.log(n)
  })
  mongoose.connection.close()
})
