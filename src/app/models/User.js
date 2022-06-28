const mongoose = require('mongoose')

const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
    name: String,
    email: String,
    username: String,
    salt: String,
    password: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

UserSchema.method('generateHash', function (password) {
    this.salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(password, this.salt)
})

UserSchema.method('verifyPassword', function (password) {
    return bcrypt.compareSync(password, this.password)
})

module.exports = mongoose.model('User', UserSchema)
