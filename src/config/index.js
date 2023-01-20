require('dotenv').config()
const db = require('./db')
const allowedOrigins = require('./allowedOrigins')
const apiDoc = require('./documentation')

module.exports = {
    db,
    allowedOrigins,
    apiDoc,
}
