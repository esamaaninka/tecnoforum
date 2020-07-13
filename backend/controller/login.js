const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/api/users/login', async(request, response, next) => {
    const body = request.body
    console.log('post login: ', body)
   
    // fullname avulla ei tunnista käyttäjää, email toimii
    let user = ""

    try{
        if(body.username){
            user = await User.findOne({fullname: body.fullname})
        }else if(body.email){
            user = await User.findOne({email: body.email})
        }    
    
        const passwordCorrect = user === null
        ? false
            : await bcrypt.compare(body.password, user.passwordHash)
    
        //console.log('after pwd check', passwordCorrect)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.fullname,
            id: user._id,
        }

        /*
            jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                if(err) { console.log(err) }    
                res.send(token);
            });        */
        const token = jwt.sign(userForToken, process.env.SECRET)
        //console('login palauttama tokeni; ', token)
        response
            .status(200)
            .send({ fullname: user.fullname, token })
        }catch(error){
            //logger.error(error)
            return response.status(401).json({ error: error})
        }
    })
 
    module.exports = loginRouter