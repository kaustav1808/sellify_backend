const Item = require('../database/models/Item')
const {
    getItemById,
    getShortItem,
    modifyItemDetails,
    archiveItem,
    removeItem,
} = require('../services/item')

const itemList = async () =>
    (await Item.find({ deleted_at: { $eq: null } })).map((item) =>
        getShortItem(item)
    )

const createItem = async (req) => {
    const newItem = {}
    newItem.title = req.body.title
    newItem.shortDescription = req.body.shortDescription
    newItem.description = req.body.description
    newItem.tags = req.body.tags
    newItem.sellType = req.body.sellType
    newItem.status = 'open'
    newItem.minPrice = Number(req.body.minPrice || 0)
    newItem.maxPrice = Number(req.body.maxPrice)
    newItem.owner = { ...req.user, _id: req.user.id }

    return getShortItem(await Item.create(newItem))
}

const updateItem = async (req) => modifyItemDetails(req.body, req.user)

const setItemToArchive = async (req) => archiveItem(req.params.id, req.user)

const deleteItem = async (req) => removeItem(req.params.id, req.user)

const findItemById = async (req) => getItemById(req.params.id)

module.exports = {
    findItemById,
    itemList,
    createItem,
    updateItem,
    setItemToArchive,
    deleteItem,
}
