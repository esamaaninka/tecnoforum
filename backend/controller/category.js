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
        .then(category => {
            response.json(category.map(p => p.toJSON()))
        })
        .catch(error => next(error))
  })

  categoryRouter.get('/api/categories/:id', (request, response, next) => {
    Category
      .findById(request.params.id)
      .then(category =>{
          //console.log(`comment ${comment} with id ${request.params.id}`)
          if(category) response.json(category.toJSON())
          else response.json(`no category found with id ${request.params.id}`)
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
        description: body.description,
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

categoryRouter.put('/api/categories', async (request, response, next) => {
  const body = request.body
  console.log('put request body:  ', body)

  const token = getTokenFrom(request)

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      throw('error: token missing or invalid')
      //return response.status(401).json({ error: 'token missing or invalid' })
    }

    const modifying_user = await User.findById(decodedToken.id)
    if(!modifying_user) {
      throw('error: something wrong with token, modifying user not found')
      //return response.status(400).json({error: 'something wrong with token, user not found'})
    }

    if(modifying_user.userType === "admin" ) {
      console.log(`attempting to update ${body} with values: ${body.description}`)
      
      const updatedCategory = await Category.findOneAndUpdate(          
          {_id: body.id}, 
          {$set:{categoryName: body.categoryName, description: body.description }},
          {new: true, omitUndefined: true}, // to return updated doc and skip undefined variables                                
          function(err,res) {                         
              if(err) {
                  throw('error: error updating category',err)
              }
            })
      
      if(!updatedCategory) {
          logger.info('category data to be updated not found')
          return response.status(400).json({error: 'category data to be updated not found'})
      }
      
      return response.status(200).json(updatedCategory.toJSON())
    }
      else return response.status(401).json({ error: 'unauthorized admin/user update operation'})

    }catch (exception) {
      next(exception)
    }
  })
  
module.exports = categoryRouter