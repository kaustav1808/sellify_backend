const { SLFYError } = require('../core/error')
const Item = require('../models/Item')
const { SLFY_UPDATING_INVALID_ENTITY } =
    require('../core/constant').error.ITEM.UPDATE

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

const modifyItemDetails = async (updatable, updatableOwner) => {
    const { id } = updatable
    const modifiableEntity = await Item.findById(id)

    // eslint-disable-next-line no-underscore-dangle
    if (!modifiableEntity.owner._id.equals(updatableOwner.id))
        throw new SLFYError(
            SLFY_UPDATING_INVALID_ENTITY,
            'Updating an unauthorized entity not permitted',
            403
        )

    if (updatable.title) modifiableEntity.title = updatable.title

    modifiableEntity.updated_at = new Date();

    await modifiableEntity.save()

    return getShortItem(modifiableEntity, true)
}

const archiveItem = async (id, updatableOwner) => {
    const modifiableEntity = await Item.findById(id)

    // eslint-disable-next-line no-underscore-dangle
    if (!modifiableEntity.owner._id.equals(updatableOwner.id))
        throw new SLFYError(
            SLFY_UPDATING_INVALID_ENTITY,
            'Updating an unauthorized entity not permitted',
            403
        )

    modifiableEntity.is_archive = true
    modifiableEntity.updated_at = new Date();

    await modifiableEntity.save()

    return getShortItem(modifiableEntity, true)
}

module.exports = { getShortItem, modifyItemDetails, archiveItem }
