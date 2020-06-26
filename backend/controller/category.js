const categoryRouter = require('express').Router()
const jwt = require('jsonwebtoken')
//const Comments = require('../models/comment')
const User = require('../models/user')
const Threads = require('../models/thread')
const Category = require('../models/category')
const logger = require('../utils/logger')



categoryRouter.get('/api/categories', (request, response,next) => {
    
    Category
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

  categoryRouter.post('/api/categories', async (request, response,next) => {
    
    const body = request.body  
    const token = getTokenFrom(request)
 
    try{
      const decodedToken = jwt.verify(token, process.env.SECRET)
      
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
    
        const category = new Category({
        categoryName: body.categoryName,
        author: user.fullname, 
        user_id: user._id,
        date: new Date()
      })
    
      const savedCategory = await category.save()
      
      response.json(savedCategory.toJSON())

    }catch(error) {
      logger.error(error)
      return response.status(401).json({ error: error.name})
    } 
})    
  
module.exports = categoryRouter