const mongoose = require('mongoose')

const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UseTokenSchema = Schema({
    accesstoken: String,
    refreshtoken: String,
    userId: String,
    expiretime: String,
})

module.exports = mongoose.model('UserToken', UseTokenSchema)
