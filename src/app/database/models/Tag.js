const mongoose = require('mongoose')

const { Schema } = mongoose

const TagSchema = Schema({
    tag: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    owner: {
        id: mongoose.ObjectId,
        email: String,
        username: String,
    },
})

module.exports = mongoose.model('TagSchema', TagSchema)
