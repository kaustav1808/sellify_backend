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
    components: {
        schemas: {
                ItemList : [
                    {
                        "id": "6374fda5be66792d03686211",
                        "title": "abcd",
                        "shortDescription": "skfpsfpo",
                        "description": "abcd",
                        "tags": [
                            "a",
                            "v"
                        ],
                        "sellType": "range",
                        "status": "open",
                        "minPrice": 500,
                        "maxPrice": 700,
                        "created_at": "2022-11-16T15:11:33.348Z",
                        "updated_at": "2022-11-16T15:11:33.348Z"
                    }
                ],
                Item : {
                    "is_archive": false,
                    "_id": "6374fda5be66792d03686211",
                    "title": "abcd",
                    "shortDescription": "skfpsfpo",
                    "description": "abcd",
                    "tags": [
                        "a",
                        "v"
                    ],
                    "sellType": "range",
                    "status": "open",
                    "minPrice": 500,
                    "maxPrice": 700,
                    "deleted_at": null,
                    "created_at": "2022-11-16T15:11:33.348Z",
                    "updated_at": "2022-11-16T15:11:33.348Z",
                    "__v": 0
                },

        }
    },
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
