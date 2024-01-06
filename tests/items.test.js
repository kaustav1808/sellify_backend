const request = require('supertest')
const server = require('../src/app')

const client = request(server)
const { db } = require('../src/config')

let dbConnection = null
let accessToken = null
let uniqueItem = null

// eslint-disable-next-line no-undef
beforeAll(async () => {
    dbConnection = await db.connect()

    const response = await client.post('/api/auth/signup').send({
        email: 'abc.test@email.com',
        password: '123456',
    })

    accessToken = response.body.newtoken.accesstoken
})

describe('Test for /api/items', () => {
    test('It should throw validation error for empty request body', async () => {
        const response = await client
            .post('/api/items')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({})

        expect(response.statusCode).toBe(402)
        expect(response.body.code).toBe('SLFY_VALIDATION_ERROR')
        expect(response.body.message).toBe('Validation Error.')
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    key: 'title',
                    message: '"title" is required',
                }),
                expect.objectContaining({
                    key: 'shortDescription',
                    message: '"shortDescription" is required',
                }),
                expect.objectContaining({
                    key: 'sellType',
                    message: '"sellType" is required',
                }),
                expect.objectContaining({
                    key: 'maxPrice',
                    message: '"maxPrice" is required',
                }),
            ])
        )
    })

    test('It should throw validation error for empty `selltype`', async () => {
        const response = await client
            .post('/api/items')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'test title',
                shortDescription: 'test shortDescription',
                description: 'test description',
                sellType: '',
                maxPrice: 800.25,
            })

        expect(response.statusCode).toBe(402)
        expect(response.body.code).toBe('SLFY_VALIDATION_ERROR')
        expect(response.body.message).toBe('Validation Error.')
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    key: 'sellType',
                    message: '"sellType" must be one of [RANGE, AUCTION]',
                }),
                expect.objectContaining({
                    key: 'sellType',
                    message: '"sellType" is not allowed to be empty',
                }),
            ])
        )
    })

    test('It should throw validation error for empty `maxprice`', async () => {
        const response = await client
            .post('/api/items')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'test title',
                shortDescription: 'test shortDescription',
                description: 'test description',
                sellType: 'AUCTION',
            })

        expect(response.statusCode).toBe(402)
        expect(response.body.code).toBe('SLFY_VALIDATION_ERROR')
        expect(response.body.message).toBe('Validation Error.')
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    key: 'maxPrice',
                    message: '"maxPrice" is required',
                }),
            ])
        )
    })

    test('It should throw validation error for `maxprice` less than 100', async () => {
        const response = await client
            .post('/api/items')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'test title',
                shortDescription: 'test shortDescription',
                description: 'test description',
                sellType: 'AUCTION',
                maxPrice: 99.99,
            })

        expect(response.statusCode).toBe(402)
        expect(response.body.code).toBe('SLFY_VALIDATION_ERROR')
        expect(response.body.message).toBe('Validation Error.')
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    key: 'maxPrice',
                    message: '"maxPrice" must be greater than or equal to 100',
                }),
            ])
        )
    })

    test('It should throw validation error if sellType is `RANGE` and minPrice is empty', async () => {
        const response = await client
            .post('/api/items')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'test title',
                shortDescription: 'test shortDescription',
                description: 'test description',
                sellType: 'RANGE',
                maxPrice: 109.75,
            })

        expect(response.statusCode).toBe(402)
        expect(response.body.code).toBe('SLFY_VALIDATION_ERROR')
        expect(response.body.message).toBe('Validation Error.')
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    key: 'minPrice',
                    message: '"minPrice" is required',
                }),
            ])
        )
    })

    test('It should create a new item', async () => {
        const response = await client
            .post('/api/items')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'test title',
                shortDescription: 'test shortDescription',
                description: 'test description',
                sellType: 'RANGE',
                maxPrice: 102.75,
                minPrice: 50.55,
                tags: ['tag 1', 'tag 2'],
            })

        expect(response.statusCode).toBe(201)
        expect(typeof response.body.id).toBe('string')
        expect(response.body.title).toBe('test title')
        expect(response.body.shortDescription).toBe('test shortDescription')
        expect(response.body.description).toBe('test description')
        expect(response.body.sellType).toBe('RANGE')
        expect(response.body.maxPrice).toBe(102.75)
        expect(response.body.minPrice).toBe(50.55)
        expect(response.body.status).toBe('OPEN')
        expect(response.body.tags[0]).toHaveProperty('tag', 'tag 1')
        expect(response.body.tags[1]).toHaveProperty('tag', 'tag 2')
    })

    test('It should successfully fetch list of items', async () => {
        const response = await client.get('/api/items').send()

        // currently by passing this test
        expect(response.statusCode).toBe(200)

        let firstItem = response.body[0]

        expect(typeof firstItem.title).toBe('string')
        expect(typeof firstItem.shortDescription).toBe('string')
        expect(typeof firstItem.description).toBe('string')
        expect(['RANGE', 'AUCTION']).toContain(firstItem.sellType)
        expect(typeof firstItem.maxPrice).toEqual('number')
        expect(typeof firstItem.minPrice).toEqual('number')
        expect(firstItem.minPrice <= firstItem.maxPrice).toBe(true)
        expect(['OPEN', 'CLOSE']).toContain(firstItem.status)

        uniqueItem = firstItem
    })

    test('It should successfully fetch the desired item', async () => {
        const response = await client.get(`/api/items/${uniqueItem.id}`).send()

        // currently by passing this test
        expect(response.statusCode).toBe(200)

        let firstItem = response.body

        expect(typeof firstItem.title).toBe('string')
        expect(typeof firstItem.shortDescription).toBe('string')
        expect(typeof firstItem.description).toBe('string')
        expect(['RANGE', 'AUCTION']).toContain(firstItem.sellType)
        expect(typeof firstItem.maxPrice).toEqual('number')
        expect(typeof firstItem.minPrice).toEqual('number')
        expect(firstItem.minPrice <= firstItem.maxPrice).toBe(true)
        expect(['OPEN', 'CLOSE']).toContain(firstItem.status)

        uniqueItem = firstItem
    })

    test('It should update the title, description, shortDescription of the desired item', async () => {
        console.log(uniqueItem)
        const response = await client
            .put(`/api/items/${uniqueItem.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                id: uniqueItem._id,
                title: 'updated item title',
                description: 'updated item description',
                shortDescription: 'updated item shortDescription',
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe('updated item title')
        expect(response.body.description).toBe('updated item description')
        expect(response.body.shortDescription).toBe(
            'updated item shortDescription'
        )
    })

    test('It will given validation error while update the minPrice. When minPrice will be greater than maxprice of the desired item', async () => {
        const response = await client
            .put(`/api/items/${uniqueItem.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                id: uniqueItem._id,
                minPrice: 200,
                maxPrice: 150,
            })

        expect(response.statusCode).toBe(403)
        expect(response.body.code).toBe('SLFY_MAXPRICE_GREATER_THAN_MIN_PRICE')
        expect(response.body.message).toBe(
            'Max price should be greater than min price of the item.'
        )
    })

    test('It should update the minPrice and maxPrice of the desired item', async () => {
        const response = await client
            .put(`/api/items/${uniqueItem.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                id: uniqueItem._id,
                minPrice: 200.75,
                maxPrice: 300.65,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.minPrice).toBe(200.75)
        expect(response.body.maxPrice).toBe(300.65)
    })

    test('It should archive the desired item', async () => {
        const response = await client
            .get(`/api/items/set-archive/${uniqueItem.id}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.isArchive).toBe(true)
    })

    test('It should soft delete the desired item', async () => {
        const response = await client
            .delete(`/api/items/${uniqueItem.id}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(true)
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
