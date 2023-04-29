require('dotenv').config()
const db = require('./db')
const allowedOrigins = require('./allowedOrigins')
const apiDocSpecification = require('./documentation')

module.exports = {
    db,
    allowedOrigins,
    apiDocSpecification,
}
