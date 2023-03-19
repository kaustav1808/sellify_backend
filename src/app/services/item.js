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

module.exports = {getShortItem}