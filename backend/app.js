const express = require('express')
const app = express()
const cors = require('cors')
//const xxxRouter = require('./controllers/xxx')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const userRouter = require('./controller/user')
const commentRouter = require('./controller/comment')
const loginRouter = require('./controller/login')
const threadRouter = require('./controller/thread')
const categoryRouter = require('./controller/category')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
		() => logger.info ("Connection to mongodb successful"),
		(error) => logger.error(error)
	);
	  
	mongoose.connection.on('error', err => {
		logger.info(err);
	});

app.use(cors())
//app.use(express.static('build')) //NOT BUILT YET
app.use(express.json())
app.use(middleware.requestLogger)
app.use('', userRouter)
app.use('', loginRouter)
app.use('', commentRouter)
app.use('', threadRouter)
app.use('', categoryRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
