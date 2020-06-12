const bcrypt = require('bcrypt')
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

  
   // .findOne({ fullname: `${name}` }, function (error, user) {
    
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
    console.log("post: ", request.body)
    const body = request.body

    const saltrounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltrounds)
    console.log('Hashed pwd: ', passwordHash)
    
    const user = new User({
        fullname: body.fullname,
        password: body.password,
        passwordHash: passwordHash,
        email: body.email,
        nickname: body.nickname
    })

    user.save()
        .then(result => {
            console.log('post result: ', result)
            response.status(201).json(result)
        })
        .catch(error => next(error))
})


/* KESKEN 
userRouter.delete('/api/users/:name_or_id'), (request, response,next) => {
    console.log("Deleting with name or id: ", request.params.name_or_id)
    console.log(typeof request.params.name_or_id)
    User
        .findOneAndDelete
}
*/
module.exports = userRouter

