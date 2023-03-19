const { SLFYError } = require('../core/error')
const Item = require('../models/Item')
const { SLFY_ACCESSING_INVALID_ITEM } =
    require('../core/constant').error.ITEM

const getShortItem = (item) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: item._id,
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    tags: item.tags,
    sellType: item.sellType,
    status: item.status,
    minPrice: item.minPrice,
    maxPrice: item.maxPrice,
    created_at: item.created_at,
    updated_at: item.updated_at,
})

const checkValidItemByID = async (id, accessableOwner) => {
    const item = await Item.findOne({_id:id, deleted_at: {$eq:null}})

    if(!item) {
        throw new SLFYError(
            SLFY_ACCESSING_INVALID_ITEM,
            'The item is not exists',
            403
        )
    }

    // eslint-disable-next-line no-underscore-dangle
    if (!item.owner._id.equals(accessableOwner.id))
        throw new SLFYError(
            SLFY_ACCESSING_INVALID_ITEM,
            'Updating an unauthorized item.',
            403
        )

    return item
}

const modifyItemDetails = async (updatable, updatableOwner) => {
    const modifiableEntity = await checkValidItemByID(updatable.id, updatableOwner)

    if (updatable.title) modifiableEntity.title = updatable.title

    modifiableEntity.updated_at = new Date()

    await modifiableEntity.save()

    return getShortItem(modifiableEntity, true)
}

const archiveItem = async (id, updatableOwner) => {
    const modifiableEntity = await checkValidItemByID(id, updatableOwner)

    modifiableEntity.is_archive = true
    modifiableEntity.updated_at = new Date()

    await modifiableEntity.save()

    return getShortItem(modifiableEntity, true)
}

const removeItem = async (id, updatableOwner) => {
    const modifiableEntity = await checkValidItemByID(id, updatableOwner)

    modifiableEntity.deleted_at = new Date()

    await modifiableEntity.save()

    return true
}

module.exports = { getShortItem, modifyItemDetails, archiveItem, removeItem }
