const commentRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comments = require('../models/comment')
const User = require('../models/user')
const Category = require('../models/category')
const Thread = require('../models/thread')
const { response } = require('../app')
const logger = require('../utils/logger')

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

commentRouter.get('/api/comments/pages', (request, response, next) => {
  console.log(`/api/comments/page pagination from page ${request.query.page} limit ${request.query.limit} for thread: ${request.query.thread_id}`)
   
  const options = {
    select: {},//'comment  author date', // {} jos kaikki kentät
    sort: {date: 1}, // sort -1 fifo, +1 lifo
    lean: true,  // return: true for JS objects, false for Mongoose Documents
    page: parseInt(request.query.page,10), 
    limit: parseInt(request.query.limit,10) // limit 0 for metadata only
  }
  Comments
    //.paginate( {_id: request.query.thread_id}, options,
    .paginate( {thread_id: request.query.thread_id}, options,
      function(error, pageCount,paginatedResults) {
        if (error) {
            console.error(error);
          } else {
            console.log('Pages:', pageCount);
            console.log(paginatedResults); // miksi undefined ?
            response.status(200).json(pageCount)
          }
      })
    .catch(error => next(error))
})
// tämä oltava tuon edellisen jälkeen, muuten tämä kaappaa requesting
commentRouter.get('/api/comments/:id', (request, response, next) => {
  console.log('/api/comments/:id ', request.params.id)
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
      if(!user) return response.status(401).json({error: 'user not found for the token'})
      
      console.log('trying to find thread ', body.thread_id)
      const thread = await Thread.findOne({/*threadName: body.threadName*/ _id: body.thread_id})
      if(!thread) 
        return response.status(401).json({error: `thread ${body.thread_id} does not exist`})
        
      
    
      const comment = new Comments({
        thread_id: body.thread_id,
        comment: body.comment,
        author: user.fullname,
        user_id: user._id,
        date: new Date()
        
      })
    
      const savedComment = await comment.save()
      
      user.comments = user.comments.concat(savedComment._id)
      await user.save()

      thread.comments = thread.comments.concat(savedComment._id)
      await thread.save()
      
      response.json(savedComment.toJSON())

    }catch(error) {
      logger.error(error)
      return response.status(401).json({ error: error.name})
    } 
})    

commentRouter.put('/api/comments', async (request, response, next) => {
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
      console.log(`attempting to update ${body}`)
      
    // if want to update auhtor, user_id to be updated as well
    //
      const updatedComment = await Comments.findOneAndUpdate(          
          {_id: body.id}, 
          {$set:{comment: body.comment, lastModified: new Date()}},
          {new: true, omitUndefined: true}, // to return updated doc and skip undefined variables                                
          function(err,res) {                         
              if(err) {
                  throw('error: error updating user',err)
              }
            })
      
      if(!updatedComment) {
          logger.info('comment to be updated not found')
          return response.status(400).json({error: 'user data to be updated not found'})
      }
      
      return response.status(200).json(updatedComment.toJSON())
    }
      else return response.status(401).json({ error: 'unauthorized admin/user update operation'})

    }catch (exception) {
      next(exception)
    }
  })  

commentRouter.delete('/api/comments/:id', async (request, response, next) => {
    
  const body = request.body  
  const token = getTokenFrom(request)
  
  try{
      console.log('token: ', token)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      console.log('decodetToken: ', decodedToken)
      
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      console.log("admin user ", user.userType)
      if(user.userType !== "admin") {
          return response.status(401).json({ error: 'unauthorized admin delete operation'})
      }

      
        /* Delete the reference: you can do an update with $pull (the value to pull would be the resume's _id):

        Assuming that `resume.user` is *not* populated
        await User.update({ _id: resume.user }, { $pull: { resumes: resume._id } })
        ..or get the user, remove the corresponding entry in resumes, save the user.*/
        //https://stackoverflow.com/questions/61297292/how-do-i-delete-an-item-from-a-schema-which-is-an-array-of-objects-in-mongoose
      
      const comment = await Comments.findByIdAndRemove(request.params.id) 
        if(response) {
          
          await Thread.update({_id: comment.thread_id}, {$pull:{comments: comment._id} })
          // miksi nämä user updatet ei toimi? vaikka tuo yo ok ??
          // await User.update({_id: comment.user_id}, {$pull:{comments: comment._id} })
          const result = await User.findByIdAndUpdate({_id: comment.user_id}, {$pull:{comments: comment._id} }, { new: true });
            if (result)
              console.log('user pull result: ',result)
            

            
            response.status(204).end()
        }
      
      } catch (exception) {
        // tulee DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodif
        next(exception)
      }
})

  module.exports = commentRouter