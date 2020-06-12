const commentRouter = require('express').Router()
const Comments = require('../models/comment')
const { response } = require('../app')

commentRouter.get('/api/comments', (request, response,next) => {
    
    Comments
        .find({})
        .then(comment => {
            response.json(comment.map(p => p.toJSON()))
        })
        .catch(error => next(error))
  })

  commentRouter.post('/api/comments', async (request, response,next) => {
    
    const body = request.body  
    
    // token tarkistus tähän ensin

    const comment = new Comments({
        comment: body.comment,
        author: body.author, // vai id
        date: new Date()
    })
    
    const savedComment = await comment.save()
    console.log("saved comment id: ", savedComment._id)
    //user.notes = user.notes.concat(savedNote._id)
    //await user.save()
  
    response.json(savedComment.toJSON())
    //comments.save
  })    

  module.exports = commentRouter