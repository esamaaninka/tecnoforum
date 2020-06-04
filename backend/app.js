const express = require('express')
const app = express()
const cors = require('cors')
//const xxxRouter = require('./controllers/xxx')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

//const mongoose = require('mongoose')

logger.info('Connecting to ', config.MONGODB_URI)
// what are the username/pwd to be used? 
//mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors())
//app.use(express.static('build')) //NOT BUILT YET
app.use(express.json())
app.use(middleware.requestLogger)
//app.use('', xxxRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
