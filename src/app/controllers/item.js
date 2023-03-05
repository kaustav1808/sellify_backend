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

    const createItem = async (req) => {
        const newItem = {}
        newItem.title = req.body.title 
        newItem.shortDescription = req.body.shortDescription 
        newItem.description = req.body.description 
        newItem.tags = req.body.tags 
        newItem.sellType = req.body.sellType 
        newItem.status = 'open'
        newItem.minPrice = Number(req.body.minPrice)
        newItem.maxPrice = Number(req.body.maxPrice)

        return Item.create(newItem);
    }
        

module.exports = { itemList, createItem }
