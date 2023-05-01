require('dotenv').config()
const app = require('./app')
const { SLFYLogger } = require('./app/core/log')
const { getPort } = require('./app/utils/helpers')

const port = getPort()
const { db } = require('./config')

db.connect()
    .then(() => {
        // eslint-disable-next-line no-console
        SLFYLogger.info('Connection to the database successfully done.')
        app.listen(port, () => {
            // eslint-disable-next-line no-console
            SLFYLogger.info(`Express server is listening on port ${port}.`)
        })
    })
    .catch((e) => {
        // eslint-disable-next-line no-console
        SLFYLogger.info(e)
        process.exit(1)
    })
