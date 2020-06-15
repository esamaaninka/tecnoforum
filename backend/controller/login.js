const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/api/users/login', async(request, response, next) => {
    const body = request.body
    console.log('post login: ', body)
   
    //korjaa tämän username, email myöhemmin nyt toimii
    let user = ""

    try{
        if(body.username){
            user = await User.findOne({username: body.username})
        }else if(body.email){
            user = await User.findOne({email: body.email})
        }    
    
        console.log('user after email find ', user)
        
        const passwordCorrect = user === null
        ? false
            : await bcrypt.compare(body.password, user.passwordHash)
       

        //const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
        console.log('after pwd check', passwordCorrect)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.fullname,
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        response
            .status(200)
            .send({ fullname: user.fullname, token })
        }catch{console.log("Pieleen meni")}
    })
 
    module.exports = loginRouter