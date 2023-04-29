const { getHost } = require('../app/utils/helpers')

module.exports = () => ({
    swaggerDefinition: {
        swagger: '2.0',
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
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    schema: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: getHost(),
            },
        ],
    },
    apis: ['../app/routes/index.js'],
})
