const winston = require('winston')
const { v4: uuidv4 } = require('uuid')

const SLFYLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            name: 'info-file',
            filename: 'log/filelog-info.log',
            level: 'info',
        }),
        new winston.transports.File({
            name: 'error-file',
            filename: 'log/filelog-error.log',
            level: 'error',
        }),
    ],
})

const logRequest = (req) => {
    const reqId = uuidv4()
    req.request_ID = reqId
    SLFYLogger.info(`New ${req.protocol} request ID ${reqId}, path ${req.path}`)
    if (req.params) SLFYLogger.info(`Request ID ${reqId}, params ${req.params}`)
    if (req.body) SLFYLogger.info(`Request ID ${reqId}, body ${req.body}`)
}

module.exports = { SLFYLogger, logRequest }
