const commentRouter = require('express').Router()
const Comments = require('../models/comment')

commentRouter.get('/api/comments/', (request, response,next) => {
    Comments
        .find({})
        .then(comment => {
            response.json(comment.map(p => p.toJSON()))
        })
        .catch(error => next(error))
  })