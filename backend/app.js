const express = require('express')
const app = express()
const cors = require('cors')
//const xxxRouter = require('./controllers/xxx')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')

var myArgs = process.argv.slice(2);
logger.info('myArgs: ', myArgs);

if (myArgs.length < 3)
{
	logger.error("No username, password, database arguments were added");
}
else
{
	logger.info('Connecting to ', config.MONGODB_URI)

	mongoose.connect(`mongodb+srv://${myArgs[0]}:${myArgs[1]}@tecnoforum0-enrpp.mongodb.net/${myArgs[2]}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(
		() => logger.info ("Connection to mongodb successful"),
		(error) => logger.error(error)
	);
	  
	mongoose.connection.on('error', err => {
		logger.info(err);
	});
}

app.use(cors())
//app.use(express.static('build')) //NOT BUILT YET
app.use(express.json())
app.use(middleware.requestLogger)
//app.use('', xxxRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
