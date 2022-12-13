require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const router = require('./routes')
const { allowedOrigins } = require('../config')
const {SLFYError} = require('./core/error')
const {SLFY_ERROR,SLFY_ERROR_404} = require('./core/constant').error


const app = express()


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
app.use((req,_,next)=>  next(new SLFYError(SLFY_ERROR_404, `${req.method} : ${req.path} path not found`, 404)))

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
    if (error instanceof SLFYError) {
        return res.status(error.getStatus()).json(error.getError())
    } 
    const newError = new SLFYError(SLFY_ERROR,error.message)
    return res.status(newError.getStatus()).json(newError.getError())
})

module.exports = app
