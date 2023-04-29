require('dotenv').config()
const db = require('./db')
const allowedOrigins = require('./allowedOrigins')
const apiDocSpecification = require('./swaggerDoc.json')

module.exports = {
    db,
    allowedOrigins,
    apiDocSpecification,
}
