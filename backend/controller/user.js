const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
/* virhettä
Schema hasn't been registered for model "Comment".
Use mongoose.model(name, schema)

userRouter.get('/api/userscomments', async (request, response,next) => {  
    
    try{
        const users = await User
            .find({})
            .populate('comments', { comment: 1, date: 1 })
            //.populate('comments')
        response.json(users.map(u => u.toJSON()))
    } catch (exception) {
        // tulee DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodif
      next(exception)
    }

    
})
*/
userRouter.get('/api/users/name/:name', (request, response, next) => {
    console.log('/api/users/name', request.params.name)
    User
        .findOne({fullname: request.params.name}) 
        .then(user => {
            console.log("user: ", user)
            if(user){
                response.json(user.toJSON())
            }
            else {
                response.json('nothing found')
            }

        })
        .catch(error => next(error))
})

userRouter.get('/api/users/id/:id', (request, response, next) => {
    console.log('/api/users/id', request.params.id)
    console.log(typeof request.params.id)
    User
        .findById(request.params.id)
        .then(user =>{
            console.log(`user ${user} with id ${request.params.id}`)
            if(user) response.json(user.toJSON())
            else response.json('nothing found')
        })
        .catch(error => next(error))
})
// HOX jos kutsutaan await oltava tehty async sisältä
userRouter.post('/api/users/', async (request, response, next) => {
    //console.log("post: ", request.body)
    const body = request.body

    const saltrounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltrounds)
    //console.log('Hashed pwd: ', passwordHash)
    
    const user = new User({
        fullname: body.fullname,
        password: body.password,
        passwordHash: passwordHash,
        email: body.email,
        nickname: body.nickname,
        userType: body.userType
    })

    user.save()
        .then(result => {
            //console.log('post result: ', result)
            response.status(201).json(result)
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
userRouter.delete('/api/users/:id', async (request, response, next) => {
    
    const body = request.body  
    const token = getTokenFrom(request)
    
    // tarkista olenko admin tai käyttäjä itse
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        
          if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
       // console.log("admin user ", user.userType)
        if(user.userType !== "admin") {
            return response.status(401).json({ error: 'unauthorized admin delete operation'})
        }

        
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch (exception) {
          // tulee DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodif
        next(exception)
      }
    })
    
userRouter.put('/api/users/:id', async (request, response, next) => {
    
    const body = request.body  
    console.log('put request body:  ', body)
    const token = getTokenFrom(request)
    
    // tarkista olenko admin tai käyttäjä itse
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        
            if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        // if user is admin -> ok to update
        // if user !admin but the user itself -> ok to update
        console.log("I am user ", user.fullname)
        
        var umail = 'mocha.admin@gmail.com'
        var rmail = 'mocha.deplorable@test.com'
        console.log("typeof ", typeof(umail), typeof(rmail))
        console.log(`compare local mails ${umail} with ${rmail} result: ${umail.localeCompare(rmail)}`)
        
        console.log("typeof ", typeof(user.email), typeof(body.email))

        console.log(`compare mails ${user.email} with ${body.email} result: ${user.email.localeCompare(body.email)}`)
        
        if(user.userType === "admin" || user.email == body.email) {
            console.log(`attempting to update user ${body.email} nickname by ${user.fullname}`)
            //await User.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }
        else return response.status(401).json({ error: 'unauthorized admin/user update operation'})

        
        } catch (exception) {
            // tulee DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodif
        next(exception)
        }
    })


module.exports = userRouter

