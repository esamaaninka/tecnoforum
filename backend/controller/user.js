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
    
userRouter.get('/api/users/name/:name', (request, response, next) => {
    console.log('/api/users/name', request.params.name)
    User
        .findOne({fullname: request.params.name}) 
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

userRouter.get('/api/users/id/:id', (request, response, next) => {
    console.log('/api/users/id', request.params.id)
    console.log(typeof request.params.id)
    User
        .findById(request.params.id)
        .then(user =>{
            console.log(`user ${user} with id ${request.params.id}`)
            if(user) response.json(user.toJSON())
            else response.json('nothing found')
        })
        .catch(error => next(error))
})
module.exports = userRouter

