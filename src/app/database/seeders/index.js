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

const run = async () => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            throw err
        }
        SLFYLogger.info(`DB seeding start.....`)
        files.forEach(async (file) => {
            if (file !== 'index.js') {
                // eslint-disable-next-line import/no-dynamic-require, global-require, prefer-const
                let { data, metaSchema, populationNumber } = require(path.join(
                    __dirname,
                    file
                ))

                metaSchema = await beforeSeederOperation(metaSchema)

                if (populationNumber > 1) {
                    const fakerData = faker.helpers.multiple(
                        () => data(prevSeedData),
                        {
                            count: populationNumber,
                        }
                    )
                    SLFYLogger.info(
                        `Inserting ${populationNumber} of data in [Collection]::${metaSchema.collection.collectionName}`
                    )
                    metaSchema.insertMany(fakerData)
                    prevSeedData[metaSchema.collection.collectionName] =
                        fakerData
                } else {
                    const fakerData = data(prevSeedData)
                    SLFYLogger.info(
                        `Inserting ${populationNumber} of data in [Collection]::${metaSchema.collection.collectionName}`
                    )
                    metaSchema.insert(fakerData)
                    prevSeedData[metaSchema.collection.collectionName] =
                        fakerData
                }
            }
        })
    })
}

module.exports = run
