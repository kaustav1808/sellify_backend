require('dotenv').config()
const db = require('./db')
const allowedOrigins = require('./allowedOrigins')

module.exports = {
    db,
    allowedOrigins
}
