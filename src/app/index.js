require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const router = require('./routes')
const { allowedOrigins, apiDoc } = require('../config')
const { SLFYError } = require('./core/error')
const { logRequest, SLFYLogger } = require('./core/log')
const { SLFY_ERROR_404 } = require('./core/constant').error

const app = express()
const appHost = process.env.HOSTNAME || `http://localhost:${process.env.PORT || 8000}`

// eslint-disable-next-line no-console
SLFYLogger.info(`Allowing origin : ${allowedOrigins}`)

app.use(
    cors({
        origin: allowedOrigins,
    })
)

app.use(bodyparser.json())

app.get('/', (_req, res) => res.status(200).send('Welcome to sellify.'))

app.use(
    '/api',
    (req, _, next) => {
        logRequest(req)
        next(null, true)
    },
    router
)

if (process.env.API_DOC_SHOWABLE === 'true') {
    const specs = swaggerJsdoc(apiDoc(process.env.PORT || 8000))
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });

   SLFYLogger.info(`API docs available at ${appHost}/api-docs`)
}

app.use((req, _, next) => {
    next(
        new SLFYError(
            SLFY_ERROR_404,
            `${req.method} : ${req.path} path not found`,
            404
        )
    )
})

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
    if (error instanceof SLFYError) {
        SLFYLogger.error(
            `Error for request ${req.request_ID},`,
            error.getError()
        )
        return res.status(error.getStatus()).json(error.getError())
    }

    const newError = new SLFYError(error.code, error.message, error.status)
    SLFYLogger.error(
        `Error for request ${req.request_ID},`,
        newError.getError()
    )
    return res.status(newError.getStatus()).json(newError.getError())
})

module.exports = app
