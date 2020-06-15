const commentRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comments = require('../models/comment')
const { response } = require('../app')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('basic ')) {
        return authorization.substring(6)
      }
    else if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

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
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    //const user = await User.findById(decodedToken.id)

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
  })    

  module.exports = commentRouter