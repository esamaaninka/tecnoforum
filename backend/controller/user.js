const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/api/users', (request, response,next) => {
    User
        .find({})
        .then(users => {
            response.json(users.map(p => p.toJSON()))
        })
        .catch(error => next(error))
  })

  
   // .findOne({ fullname: `${name}` }, function (error, user) {
    
userRouter.get('/api/users/:name', (request, response, next) => {
    // miten saada requestin kautta isot alkukirjaimet ??
    // haku kyllä toimii isoillakin kirjaimilla 
    console.log('/api/users/name', request.params.name)
    //console.log(typeof request.params.name)
    User
        .findOne({fullname: request.params.name}) 
        //.findOne({fullname: 'Kalle Mätitahna'}) 
        .then(user => {
            console.log("user: ", user)
            if(user){
                response.json(user.toJSON())
            }
            else {
                response.json('nothing found')
            }

        })
        .catch(error => next(error))
})

module.exports = userRouter

