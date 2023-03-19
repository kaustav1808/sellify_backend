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
})

const modifyItemDetails = async (updatable, updatableOwner) => {
    const { id } = updatable
    const modifiableEntity = Item.findById(id)

    // eslint-disable-next-line dot-notation
    if (modifiableEntity.owner['_id'] !== updatableOwner.id)
        throw new SLFYError(
            SLFY_UPDATING_INVALID_ENTITY,
            'Updating an unauthorized entity not permitted',
            403
        )

    if (updatable.title) modifiableEntity.title = updatable.title

    await modifiableEntity.save()

    return getShortItem(modifiableEntity)
}

module.exports = { getShortItem, modifyItemDetails }
