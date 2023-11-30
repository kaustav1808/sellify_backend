const fs = require('fs')
const path = require('path')
const { faker } = require('@faker-js/faker')
const { SLFYLogger } = require('../../core/log')
const { seeder } = require('../../../config/db')

const prevSeedData = {}

const beforeSeederOperation = async (metaSchema) => {
    if (process.env.NODE_ENV !== 'development') {
        return metaSchema
    }
    if (seeder.dropCollection) {
        SLFYLogger.info(
            `Dropping [Collection]:: ${metaSchema.collection.collectionName}`
        )
        await metaSchema.collection.drop()
    }

    if (seeder.truncateData) {
        SLFYLogger.info(
            `Truncating data from [Collection]::${metaSchema.collection.collectionName}`
        )
        await metaSchema.deleteMany({})
    }

    return metaSchema
}

const dataSeedMany = async (data, metaSchema, populationNumber) => {
    const fakerData = faker.helpers.multiple(
        () => data(prevSeedData),
        {
            count: populationNumber,
        }
    )
    SLFYLogger.info(
        `Inserting ${populationNumber} of data in [Collection]::${metaSchema.collection.collectionName}`
    )
    await metaSchema.insertMany(fakerData)
    prevSeedData[metaSchema.collection.collectionName] = await metaSchema.find({})
}

const dataSeedSingle = async (data, metaSchema, populationNumber) => {
    const fakerData = data(prevSeedData)
    SLFYLogger.info(
        `Inserting ${populationNumber} of data in [Collection]::${metaSchema.collection.collectionName}`
    )
    await metaSchema.insert(fakerData)
    prevSeedData[metaSchema.collection.collectionName] = await metaSchema.find({})
}

const processFile = async (file) => {
    if (file !== 'index.js') {
        // eslint-disable-next-line import/no-dynamic-require, global-require, prefer-const
        let { data, metaSchema, populationNumber } = require(path.join(
            __dirname,
            file
        ))

        metaSchema = await beforeSeederOperation(metaSchema)

        if (populationNumber > 1) {
            await dataSeedMany(data, metaSchema, populationNumber)
        } else {
            await dataSeedSingle(data,metaSchema,populationNumber)
        }
    }
}

const run = async () => {
    fs.readdir(__dirname, async (err, files) => {
        if (err) {
            throw err
        }
        SLFYLogger.info(`DB seeding start.....`)
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < files.length; index++) {
            SLFYLogger.info(`processing ${files[index]}`)
            // eslint-disable-next-line no-await-in-loop
            await processFile(files[index])
          }
        SLFYLogger.info(`DB seeding finished.....`)
    })
}



module.exports = run
