const Item = require('../models/Item')
const items = require('../../../../items.json')

const populationNumber = 500

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const getFakerData = (prevSeedData) => {
    const randomInt = getRndInteger(0, items.length - 101)
    const item = items[randomInt]
    const { users } = prevSeedData
    const randomusers = users[getRndInteger(0, users.length - 1)]

    return {
        title: item.name,
        shortDescription: item.slug,
        description: item.description,
        tags: item.tags,
        sellType: 'range',
        status: 'open',
        minPrice: Math.floor(item.price * 100),
        maxPrice: Math.floor(item.price * 100 + getRndInteger(50, 250)),
        owner: {
            // eslint-disable-next-line no-underscore-dangle
            _id: randomusers._id,
            email: randomusers.email,
            username: randomusers.username,
        },
    }
}

module.exports = { data: getFakerData, metaSchema: Item, populationNumber }
