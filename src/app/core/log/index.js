const { format, createLogger, transports } = require('winston')
const { v4: uuidv4 } = require('uuid')

const formatConf = format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.json(),
    format.printf(
        (obj) =>
            `[${obj.timestamp}#${obj.code || 'SLFY_LOG'}][${obj.level}]: ${
                obj.message
            }`
    )
)

const infoLogger = createLogger({
    level: 'info',
    transports: [
        new transports.File({
            name: 'info-file',
            filename: `log/${new Date().toDateString()}-filelog-info.log`,
        }),
        new transports.Console(),
    ],
    format: formatConf,
})

const errorLogger = createLogger({
    level: 'error',
    transports: [
        new transports.File({
            name: 'error-file',
            filename: `log/${new Date().toDateString()}-filelog-error.log`,
        }),
        new transports.Console(),
    ],
    format: formatConf,
})

const SLFYLogger = {
    info: (msg, meta = {}) => infoLogger.info(msg, meta),
    error: (msg, meta = {}) => errorLogger.error(msg, meta),
}

const logRequest = (req) => {
    const reqId = uuidv4()
    req.request_ID = reqId
    SLFYLogger.info(
        `New ${req.protocol} request ID ${reqId}, path ${req.method}:: ${req.path}`
    )
    if (req.params)
        SLFYLogger.info(
            `Request ID ${reqId}, params ${JSON.stringify(req.params)}`
        )
    if (req.body)
        SLFYLogger.info(`Request ID ${reqId}, body ${JSON.stringify(req.body)}`)
}

module.exports = { SLFYLogger, logRequest }
