const Item = require('../models/Item')
const items = require('../../../../items.json')
const { OPEN, RANGE } = require('../../constants/ItemStatus')

const populationNumber = 500

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const getRandomImages = () =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
        const id = Math.floor(Math.random() * 10 + 100)
        return {
            original: `${id}/1000/600/`,
            thumbnail: `${id}/250/150/`,
        }
    })

const getFakerData = (prevSeedData) => {
    const randomInt = getRndInteger(0, items.length - 101)
    const item = items[randomInt]
    const { users } = prevSeedData
    const randomusers = users[getRndInteger(0, users.length - 1)]
    const images = getRandomImages()

    return {
        title: item.name,
        shortDescription: item.slug,
        description: item.description,
        tags: item.tags,
        sellType: RANGE,
        status: OPEN,
        minPrice: Math.floor(item.price * 100),
        maxPrice: Math.floor(item.price * 100 + getRndInteger(50, 250)),
        images,
        owner: {
            // eslint-disable-next-line no-underscore-dangle
            id: randomusers._id,
            email: randomusers.email,
            username: randomusers.username,
        },
    }
}

module.exports = { data: getFakerData, metaSchema: Item, populationNumber }
