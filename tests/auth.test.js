const request = require('supertest')
const server = require('../src/app')
const { db } = require('../src/config')

let dbConnection = null

beforeAll(async () => {
    dbConnection = await db.connect()
})

describe('post /api/auth response', () => {
    test('It should successfully register a user', async () => {
        const response = await request(server).post('/api/auth/signup', {
            email: 'kaustavtatai18h@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(201)
    })

    test('It should send user exists', async () => {
        const response = await request(server).post('/api/auth/signup', {
            email: 'kaustavtatai18h@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('user already exists.')
        expect(response.body.code).toBe('USER_EXISTS')
    })
})

afterAll(async () => {
    await dbConnection.connection.db.dropDatabase()
    await dbConnection.connection.close()
})
