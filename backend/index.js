const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// module export needed for mocha tests
module.exports = server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})