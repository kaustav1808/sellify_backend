const request = require('supertest')
const server = require('../src/app')

const client = request(server)
const { db } = require('../src/config')

let dbConnection = null

// eslint-disable-next-line no-undef
beforeAll(async () => {
    dbConnection = await db.connect()
})

describe('GET:: /api response', () => {
    test('It should send success message with 200 status.', async () => {
        const response = await client.get('/api/')

        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('success')
    })
})

describe('GET:: / response', () => {
    test('It should send welcome message with 200 status.', async () => {
        const response = await client.get('/')

        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('Welcome to sellify.')
    })
})

// eslint-disable-next-line no-undef
afterAll(async () => {
    await dbConnection.connection.db.dropDatabase()
    await dbConnection.connection.close()
})
