const request = require('supertest')
const server = require('../src/app')

const client = request(server)
const { db } = require('../src/config')

let dbConnection = null

// eslint-disable-next-line no-undef
beforeAll(async () => {
    dbConnection = await db.connect()
})

describe('Test for /api/auth', () => {
    test('It should successfully register a user', async () => {
        const response = await client.post('/api/auth/signup').send({
            email: 'kaustavtatai18h@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(201)
    })

    test('It should send user exists', async () => {
        const response = await client.post('/api/auth/signup').send({
            email: 'kaustavtatai18h@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(409)
        expect(response.body.message).toBe('User already exists')
        expect(response.body.code).toBe('SLFY_USER_EXISTS')
    })
})

// eslint-disable-next-line no-undef
afterAll(async () => {
    await dbConnection.connection.db.dropDatabase()
    await dbConnection.connection.close()
})
