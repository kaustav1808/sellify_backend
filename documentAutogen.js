const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
const spec = require('./src/config/documentation')
const { SLFYLogger } = require('./src/app/core/log')

const outPutFile = './src/config/swaggerDoc.json'
const endPointFiles = ['./src/app/routes/index.js']

SLFYLogger.info(
    `[The base definition]: ${JSON.stringify(
        spec.getBaseDefinition(),
        null,
        '\t'
    )}`
)

swaggerAutogen(outPutFile, endPointFiles, spec.getBaseDefinition())
