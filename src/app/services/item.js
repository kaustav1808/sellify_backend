const { SLFYError } = require('../core/error')
const Item = require('../database/models/Item')
const { getTags } = require('../utils/helpers')
const {
    SLFY_ACCESSING_INVALID_ITEM,
    SLFY_INVALID_ITEM,
    SLFY_MAXPRICE_GREATER_THAN_MIN_PRICE,
} = require('../core/constant').error.ITEM

const getShortItem = (item) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: item._id,
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    tags: getTags(item.tags),
    isArchive: item.is_archive,
    sellType: item.sellType,
    status: item.status,
    images: item.images,
    priceOffset: item.priceOffset,
    minPrice: item.minPrice,
    maxPrice: item.maxPrice,
    created_at: item.created_at,
    updated_at: item.updated_at,
    owner: item.owner,
})

const getItemById = async (id) => {
    const item = await Item.findOne({ _id: id, deleted_at: { $eq: null } })

    if (!item) {
        throw new SLFYError(SLFY_INVALID_ITEM, 'The item is not exists', 403)
    }

    return getShortItem(item)
}

const checkValidItemByID = async (id, accessableOwner) => {
    const item = await getItemById(id)

    // eslint-disable-next-line no-underscore-dangle
    if (!item.owner.id.equals(accessableOwner.id))
        throw new SLFYError(
            SLFY_ACCESSING_INVALID_ITEM,
            'Updating an unauthorized item.',
            403
        )

    return item
}

const modifyItemDetails = async (updatable, params, updatableOwner) => {
    const modifiableEntity = await checkValidItemByID(params.id, updatableOwner)
    const minPrice = updatable.minPrice
        ? Number(updatable.minPrice)
        : modifiableEntity.minPrice
    const maxPrice = updatable.maxPrice
        ? Number(updatable.maxPrice)
        : modifiableEntity.maxPrice

    if (updatable.title) modifiableEntity.title = updatable.title
    if (updatable.shortDescription)
        modifiableEntity.shortDescription = updatable.shortDescription
    if (updatable.description)
        modifiableEntity.description = updatable.description
    if (updatable.tags) modifiableEntity.tags = getTags(updatable.tags)
    if (updatable.minPrice) {
        if (minPrice > maxPrice) {
            throw new SLFYError(
                SLFY_MAXPRICE_GREATER_THAN_MIN_PRICE,
                'Max price should be greater than min price of the item.',
                403
            )
        }
        if (modifiableEntity.sellType !== 'auction')
            modifiableEntity.minPrice = minPrice
    }

    if (updatable.maxPrice) {
        if (minPrice > maxPrice) {
            throw new SLFYError(
                SLFY_MAXPRICE_GREATER_THAN_MIN_PRICE,
                'Max price should be greater than min price of the item.',
                403
            )
        }
        modifiableEntity.maxPrice = maxPrice
    }

    modifiableEntity.updated_at = new Date()

    await Item.updateOne({ _id: params.id }, modifiableEntity)

    return modifiableEntity
}

const archiveItem = async (id, updatableOwner) => {
    const modifiableEntity = await checkValidItemByID(id, updatableOwner)

    modifiableEntity.is_archive = true
    modifiableEntity.updated_at = new Date()

    await Item.updateOne({ _id: id }, modifiableEntity)

    return getShortItem(modifiableEntity, true)
}

const removeItem = async (id, updatableOwner) => {
    const modifiableEntity = await checkValidItemByID(id, updatableOwner)

    modifiableEntity.deleted_at = new Date()

    await Item.updateOne({ _id: id }, modifiableEntity)

    return true
}

module.exports = {
    getItemById,
    getShortItem,
    modifyItemDetails,
    archiveItem,
    removeItem,
}
