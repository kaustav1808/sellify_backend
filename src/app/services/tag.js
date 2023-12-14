const SLFYError = require('../core/error/SLFYError')
const { SLFY_TAG_CREATE_ERROR, SLFY_TAG_EXISTS_ERROR } =
    require('../core/constant').error.TAG
const Tag = require('../database/models/Tag')
const { getRandomColor } = require('../utils/helpers')

const list = async (query) => {
    const { tag } = query
    const searchQuery = {}

    if (tag && tag.trim().length)
        searchQuery.tag = { $regex: new RegExp(tag.trim()), $options: 'i' }

    return Tag.find(searchQuery, { limit: 30 })
              .select({ tag: 1, colorCode:1, _id: 0 })
}

const create = async (req) => {
    const { tag } = req.body

    if (!tag)
        throw new SLFYError(
            SLFY_TAG_CREATE_ERROR,
            'Could not create new tag.',
            400
        )

    if (!tag.trim())
        throw new SLFYError(
            SLFY_TAG_CREATE_ERROR,
            'Could not create new tag.',
            400
        )

    const checkIfExists = await Tag.count({
        tag: { $regex: new RegExp(tag.trim()), $options: 'i' },
    })

    if (checkIfExists)
        throw new SLFYError(
            SLFY_TAG_EXISTS_ERROR,
            `This tag "${tag}" is already exists.`,
            400
        )

    const newtag = await Tag.create({
        tag: tag.trim(),
        colorCode: getRandomColor(),
        owner: { ...req.user, id: req.user.id },
    })
    return { id: newtag.id, tag: newtag.tag }
}

module.exports = { list, create }
