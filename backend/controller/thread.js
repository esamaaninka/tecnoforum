const threadRouter = require('express').Router()
const jwt = require('jsonwebtoken')
//const Comments = require('../models/comment')
const User = require('../models/user')
const Category = require('../models/category')
const Threads = require('../models/thread')
//const { response } = require('../app')
const logger = require('../utils/logger')
//const { ConnectionStates } = require('mongoose') // mistä tämä tuli ?


threadRouter.get('/api/threads', (request, response,next) => {
    
    Threads
        .find({})
        .then(comment => {
            response.json(comment.map(p => p.toJSON()))
        })
        .catch(error => next(error))
  })

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

  threadRouter.post('/api/threads', async (request, response,next) => {
    
    const body = request.body  
    const token = getTokenFrom(request)
 
    try{
      const decodedToken = jwt.verify(token, process.env.SECRET)
      
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      
      const category = await Category.findOne({categoryName: body.categoryName})
      if(!category) 
        return response.status(401).json({error: `category ${body.categoryName} does not exist`})
    
      const thread = new Threads({
        category_id: category._id,
        threadName: body.threadName,
        author: user.fullname, // vai id
        user_id: user._id,
        date: new Date()
      })
    
      const savedThread = await thread.save()
      
      category.threads = category.threads.concat(savedThread._id)
      await category.save()
      
      response.json(savedThread.toJSON())

    }catch(error) {
      logger.error(error)
      return response.status(401).json({ error: error.name})
    } 
})    
  
module.exports = threadRouter