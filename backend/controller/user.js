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

//userRouter.get('/api/users/:name', (request, respnse, next) => {
//    User
//        .find({}) 
//})
module.exports = userRouter

