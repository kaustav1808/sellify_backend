const request = require('supertest')
const server = require('../src/app')

const client = request(server)
const { db } = require('../src/config')

let dbConnection = null
let accessToken = null
let refreshToken = null 

// eslint-disable-next-line no-undef
beforeAll(async () => {
    dbConnection = await db.connect()
})

describe('Consolidate test for the authentication module', () => {
    test('It should successfully register a user', async () => {
        const response = await client.post('/api/auth/signup').send({
            email: 'abc.xyz@email.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(201)
    })

    test('It should send error message SLFY_USER_EXISTS', async () => {
        const response = await client.post('/api/auth/signup').send({
            email: 'abc.xyz@email.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(409)
        expect(response.body.message).toBe('User already exists')
        expect(response.body.code).toBe('SLFY_USER_EXISTS')
    })

    test('It should send error message SLFY_USER_NOT_FOUND', async () => {
        const response = await client.post('/api/auth/signin').send({
            email: 'abc.lmn@email.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('User not found.')
        expect(response.body.code).toBe('SLFY_USER_NOT_FOUND')
    })

    test('It should send error message SLFY_PASSWORD_NOT_MATCHED', async () => {
        const response = await client.post('/api/auth/signin').send({
            email: 'abc.xyz@email.com',
            password: '1234',
        })

        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('Password not matched')
        expect(response.body.code).toBe('SLFY_PASSWORD_NOT_MATCHED')
    })

    test('It should successfully authenticated the user and send a access token', async () => {
        const response = await client.post('/api/auth/signin').send({
            email: 'abc.xyz@email.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(200)
        expect(typeof response.body.accesstoken == 'string').toBe(true)
        expect(typeof response.body.refreshtoken == 'string').toBe(true)
        expect(typeof response.body.expiretime == 'string').toBe(true)

        accessToken = response.body.accesstoken
        refreshToken = response.body.refreshtoken
    })

    test('It should successfully send a new access token', async () => {
        const response = await client.post('/api/auth/new-token').send({
           token: refreshToken
        })

        expect(response.statusCode).toBe(201)
        expect(typeof response.body.accesstoken == 'string').toBe(true)
        expect(typeof response.body.refreshtoken == 'string').toBe(true)
        expect(typeof response.body.expiretime == 'string').toBe(true)

        accessToken = response.body.accesstoken
        refreshToken = response.body.refreshtoken
    })

    test('It should successfully logout the user', async () => {
        const response = await client.get('/api/auth/signout').set(
           'Authorization', `Bearer ${accessToken}`
        )

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe("Successfully logout!")
        
        accessToken = null
        refreshToken = null
    })
})

// eslint-disable-next-line no-undef
afterAll(async () => {
    await dbConnection.connection.db.dropDatabase()
    await dbConnection.connection.close()
})
