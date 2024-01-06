const request = require('supertest')
const server = require('../src/app')

const client = request(server)
const { db } = require('../src/config')

let dbConnection = null
let accessToken = null

// eslint-disable-next-line no-undef
beforeAll(async () => {
    dbConnection = await db.connect()

    const response = await client.post('/api/auth/signup').send({
        email: 'abc.test.2@email.com',
        password: '123456',
    })

    accessToken = response.body.newtoken.accesstoken
})

describe('Test for /api/tags', () => {
    test('It should create a new tag', async () => {
        const response = await client
            .post('/api/tags')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                tag: 'test tag',
            })

        expect(response.statusCode).toBe(201)
        expect(typeof response.body.id).toBe('string')
        expect(response.body.tag).toBe('test tag')
    })

    test('It should successfully fetch list of tags', async () => {
        const response = await client.get('/api/tags').send()

        // currently by passing this test
        expect(response.statusCode).toBe(200)

        let firstItem = response.body.data[0]

        expect(typeof firstItem.tag).toBe('string')
        expect(typeof firstItem.colorCode).toBe('string')

        uniqueItem = firstItem
    })

    test('It should successfully fetch the desired tag', async () => {
        const response = await client.get(`/api/tags`).query({tag:"test tag", page:1}).send()

        // currently by passing this test
        expect(response.statusCode).toBe(200)

        let firstItem = response.body.data[0]

        expect(firstItem.tag).toBe('test tag')
        expect(typeof firstItem.colorCode).toBe('string')
    })

})

// eslint-disable-next-line no-undef
afterAll(async () => {
    await client
        .get('/api/auth/signout')
        .set('Authorization', `Bearer ${accessToken}`)
    accessToken = null
    uniqueItem = null
    await dbConnection.connection.db.dropDatabase()
    await dbConnection.connection.close()
})
