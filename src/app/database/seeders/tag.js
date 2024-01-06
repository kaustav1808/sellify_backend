const Tag = require('../models/Tag')
const Tags = require('../../../../data/tags.json')
const { getRandomColor } = require('../../utils/helpers')

const populationNumber = 300

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function randomProperty(obj) {
    const keys = Object.keys(obj)
    // eslint-disable-next-line no-bitwise
    const key = keys[(keys.length * Math.random()) << 0]

    // eslint-disable-next-line no-param-reassign
    delete obj[key]
    return key
}

const setItemtag = (prevSeedData) => {
    // eslint-disable-next-line no-param-reassign
    if (!('tags' in prevSeedData)) prevSeedData.tags = Tags
}

const getFakerData = (prevSeedData) => {
    setItemtag(prevSeedData)
    const tag = randomProperty(prevSeedData.tags)
    const { users } = prevSeedData
    const randomusers = users[getRndInteger(0, users.length - 1)]

    return {
        tag,
        colorCode: getRandomColor(),
        owner: {
            // eslint-disable-next-line no-underscore-dangle
            id: randomusers._id,
            email: randomusers.email,
            username: randomusers.username,
        },
    }
}

module.exports = { data: getFakerData, metaSchema: Tag, populationNumber }
