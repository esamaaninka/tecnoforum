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
    
  module.exports = userRouter

