const commentRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comments = require('../models/comment')
const User = require('../models/user')
const { response } = require('../app')
const logger = require('../utils/logger')
//const { ConnectionStates } = require('mongoose') // mistä tämä tuli ?

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

  
  commentRouter.get('/api/comments/:id', (request, response, next) => {
      Comments
        .findById(request.params.id)
        .then(comment =>{
            //console.log(`comment ${comment} with id ${request.params.id}`)
            if(comment) response.json(comment.toJSON())
            else response.json(`no comment found with id ${request.params.id}`)
        })
        .catch(error => next(error))
})

  commentRouter.post('/api/comments', async (request, response,next) => {
    
    const body = request.body  
    const token = getTokenFrom(request)
 
    try{
      const decodedToken = jwt.verify(token, process.env.SECRET)
      
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
    
      const comment = new Comments({
        comment: body.comment,
        author: user.fullname, // vai id
        date: new Date(),
        user: user._id
      })
    
      const savedComment = await comment.save()
      
      user.comments = user.comments.concat(savedComment._id)
      await user.save()
      response.json(savedComment.toJSON())

    }catch(error) {
      logger.error(error.name)
      return response.status(401).json({ error: 'token not matching any user'})
    } 
})    

commentRouter.delete('/api/comments/:id', async (request, response, next) => {
    
  const body = request.body  
  const token = getTokenFrom(request)
  
  // tarkista olenko admin tai käyttäjä itse
  try{
      const decodedToken = jwt.verify(token, process.env.SECRET)
      
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      console.log("admin user ", user.userType)
      if(user.userType !== "admin") {
          return response.status(401).json({ error: 'unauthorized admin delete operation'})
      }

      // poista comment, päivitä user ja thread, category modelit 
      await Comments.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
        // tulee DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodif
      next(exception)
    }
    
})


  module.exports = commentRouter