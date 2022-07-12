require('dotenv').config()
const express = require('express')

const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const router = require('./routes')
const getError = require('./error')
const {allowedOrigins} = require('../config')

// eslint-disable-next-line no-console
console.log(`Allowing origin : ${allowedOrigins}`)

app.use(
    cors({
        origin: allowedOrigins,
    })
)

app.use(bodyparser.json())

app.get('/', (_req, res) => res.status(200).send('welcome to sellify.'))

app.use('/api', router)

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    const error = getError(err.message)
    res.status(error.status).json(error)
})

module.exports = app
