require('dotenv').config()
const express = require('express')

const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const router = require('./routes')

app.use(
    cors({
        origin: '*',
    })
)

app.use(bodyparser.json())

app.get('/', (req, res) => res.status(200).send('welcome to sellify.'))

app.use('/api', router)

app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json(err)
    } else {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = app
