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
    schemes: ['http', 'https'],
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
            ItemList: [
                {
                    id: '6374fda5be66792d03686211',
                    title: 'abcd',
                    shortDescription: 'skfpsfpo',
                    description: 'abcd',
                    tags: ['a', 'v'],
                    sellType: 'range',
                    status: 'open',
                    minPrice: 500,
                    maxPrice: 700,
                    created_at: '2022-11-16T15:11:33.348Z',
                    updated_at: '2022-11-16T15:11:33.348Z',
                },
            ],
            Item: {
                is_archive: false,
                _id: '6374fda5be66792d03686211',
                title: 'abcd',
                shortDescription: 'skfpsfpo',
                description: 'abcd',
                tags: ['a', 'v'],
                sellType: 'range',
                status: 'open',
                minPrice: 500,
                maxPrice: 700,
                deleted_at: null,
                created_at: '2022-11-16T15:11:33.348Z',
                updated_at: '2022-11-16T15:11:33.348Z',
                __v: 0,
            },
            ShortItem: {
                id: '644f8da37b202639b6a96f90',
                title: 'Fifth item',
                shortDescription: 'this is short description of fifth item',
                description: 'this is the description of the fifth item.',
                tags: ['test a', 'test b', 'test c', 'test d'],
                sellType: 'auction',
                status: 'open',
                minPrice: 0,
                maxPrice: 800.25,
                created_at: '2023-05-01T10:00:03.098Z',
                updated_at: '2023-05-01T10:06:07.215Z',
            },
        },
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
