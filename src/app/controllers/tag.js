const { create, list } = require('../services/tag')

const listtag = (query) => list(query)

const createTag = async (req) => create(req)

module.exports = {
    listtag,
    createTag,
}
