const { getHost, getHostUrl } = require('../app/utils/helpers')
const definition = require('./swaggerDoc.json')

const host = getHostUrl()

const getBaseDefinition = () => ({
    info: {
        title: 'Sellify API documentation.',
        version: '0.1.0',
        description:
            'This swagger documentation is design for the API of Sellify backend.',
        contact: {
            name: 'Kaustav Bhattacharya',
            email: 'kaustavofficial1808@gmail.com',
        },
    },
    host,
    basePath: '/api',
    securityDefinitions: {
        bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'enter the token',
        },
    },
    components: {},
})

const getSpecDefinition = () => ({
    definition,
    servers: [
        {
            url: getHost(),
        },
    ],
    apis: ['../app/routes/index.js'],
})

module.exports = { getBaseDefinition, getSpecDefinition }
