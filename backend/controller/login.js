const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

// tulisiko login olla omassa modulisssa login.js ?
// voiko path olla noin, vai pelkkä /login ? 
loginRouter.post('/api/users/login', async(request, response, next) => {
    const body = request.body
    console.log('post login: ', body)

    const user = await User.findOne({fullname: body.fullname})
    console.log("user after await: ", user)

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
    })
 
    module.exports = loginRouter