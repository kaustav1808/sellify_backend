const Item = require('../models/Item')

const itemList = async () =>
    (await Item.find({})).map((o) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: o._id,
        title: o.title,
        shortDescription: o.shortDescription,
        description: o.description,
        tags: o.tags,
        sellType: o.sellType,
        status: o.status,
        minPrice: o.minPrice,
        maxPrice: o.maxPrice,
        created_at: o.created_at,
    }))

module.exports = { itemList }
