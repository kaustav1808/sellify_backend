const Item = require('../models/Item')
const { getShortItem } = require('../services/item')

const itemList = async () => (await Item.find({})).map(item=>getShortItem(item))

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
    newItem.owner = { ...req.user, "_id":req.user.id}

    return getShortItem(await Item.create(newItem))
}

const updateItem = async (req) => {
    const newItem = {}
    newItem.title = req.body.title
    newItem.shortDescription = req.body.shortDescription
    newItem.description = req.body.description
    newItem.tags = req.body.tags
    newItem.sellType = req.body.sellType
    newItem.status = 'open'
    newItem.minPrice = Number(req.body.minPrice)
    newItem.maxPrice = Number(req.body.maxPrice)

    return getShortItem(await Item.create(newItem))
}

module.exports = { itemList, createItem, updateItem }
