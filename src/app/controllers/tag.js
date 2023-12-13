const { create } = require('../services/tag')

const listtag = () => {}

const createTag = async (req) => create(req)

module.exports = {
    listtag,
    createTag,
}
