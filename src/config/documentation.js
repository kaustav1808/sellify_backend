const { getHost, getHostUrl } = require('../app/utils/helpers')
const definition = require('./swaggerDoc.json')

const host = getHostUrl()

const getBaseDefinition = () => (
    {
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
        host, 
        basePath: '/api',
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    schema: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        }
      })

const getSpecDefinition = () => ({
  definition,
  servers: [
            {
                url: getHost(),
            },
        ],
  apis: ["../app/routes/index.js"],      

})      

module.exports = {getBaseDefinition, getSpecDefinition}
