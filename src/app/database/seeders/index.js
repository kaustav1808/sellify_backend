const AuthSeed = require('./Auth.Seed')
const { SLFYLogger } = require('../../core/log')
const Seeder = require('../models/Seeder')

const run = async () => {
    const today = new Date()
    const dateRegexSearchParam = String(today.getUTCFullYear())
        .concat('-')
        .concat(String(today.getUTCMonth() + 1).padStart(2, '0'))
        .concat('-')
        .concat(String(today.getUTCDate()).padStart(2, '0'))
    const seederIndex = await Seeder.findOne({
        created_at: { $regex: dateRegexSearchParam },
    })

    if (
        seederIndex &&
        seederIndex.currentCount + 1 <= Number(process.env.DB_SEEDING_MAX)
    ) {
        SLFYLogger.info(
            `Seeding max reach limit to ${seederIndex.currentCount}`
        )
        return
    }

    SLFYLogger.info('Seeding User data.....')
    await AuthSeed()
    SLFYLogger.info('Seeding complete of User data.....')

    if (!seederIndex) {
        Seeder.create({
            models: ['User'],
            created_at: dateRegexSearchParam,
        })
    } else {
        seederIndex.currentCount += 1
        seederIndex.save()
    }
}

module.exports = run
