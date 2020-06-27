require('dotenv').config()

let PORT = process.env.PORT || 3001
let MODE = process.env.mode 

let MONGODB_URI =  !MODE ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL_URI 

module.exports = {
  MONGODB_URI,
  PORT,
  MODE
}