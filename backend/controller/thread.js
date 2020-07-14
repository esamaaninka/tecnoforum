
const threadRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
const User = require('../models/user')
const Category = require('../models/category')
const Threads = require('../models/thread')
//const { response } = require('../app')
const logger = require('../utils/logger')


threadRouter.get('/api/threads', (request, response,next) => {
    
    Threads
        .find({})
        .then(comment => {
            response.json(comment.map(p => p.toJSON()))
        })
        .catch(error => next(error))
  })

  // BUG! populate not working yet
  threadRouter.get('/api/threads/pages', async (request, response, next) => {
    console.log(`/api/threads/pages pagination from page ${request.query.page} limit ${request.query.limit} for thread: ${request.query.category_id}`)
   
    const options = {
      select: {}, // 'threadName  author date comments ', // {} jos kaikki kentät
      sort: {date: -1}, // sort -1 lifo, +1 fifo
      //populate: 'comments',
      //populate: {path: 'comments'},//, model:'Comments', select: 'comments'},
      lean: true,
      page: parseInt(request.query.page,10), 
      limit: parseInt(request.query.limit,10) // limit 0 for metadata only
    }

    Threads
      .paginate({category_id: request.query.category_id}, options,
          function(error, pageCount, paginatedResults){
            if(error) {
              console.log(error)
              return response.status(400).json(error)
            }
            else {
              console.log('Pages: ', pageCount) // miksi date ei tulostu console mutta response ok ?
              console.log('paginatedResults: ',paginatedResults)
              return response.status(200).json(pageCount)
           }
       })        
      .catch(error => next(error))
  })

  threadRouter.get('/api/threads/:id', (request, response, next) => {
    Threads
      .findById(request.params.id)
      .then(thread =>{
          //console.log(`comment ${comment} with id ${request.params.id}`)
          if(thread) response.json(thread.toJSON())
          else response.json(`no thread found with id ${request.params.id}`)
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
    console.log('threadPost: ', body)
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
        description: body.description,
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
  
threadRouter.put('/api/threads', async (request, response, next) => {
  const body = request.body
  console.log('putThread request body:  ', body)

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
      
      const updatedThread = await Threads.findOneAndUpdate(          
          {_id: body.id}, 
          {$set:{threadName: body.threadName, description: body.description, lastModified: new Date() }},
          {new: true, omitUndefined: true}, // to return updated doc and skip undefined variables                                
          function(err,res) {                         
              if(err) {
                  throw('error: error updating thread',err)
              }
            })
      
      if(!updatedThread) {
          logger.info('thread data to be updated not found')
          return response.status(400).json({error: 'thread data to be updated not found'})
      }
      
      return response.status(200).json(updatedThread.toJSON())
    }
      else return response.status(401).json({ error: 'unauthorized admin update operation'})

    }catch (exception) {
      next(exception)
    }
  })

module.exports = threadRouter