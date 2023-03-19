const mongoose = require('mongoose')

const { Schema } = mongoose

const ItemSchema = Schema({
    title: String,
    shortDescription: String,
    description: String,
    tags: [String],
    sellType: { type: String, enum: ['range', 'auction'] },
    status: { type: String, enum: ['open', 'close'] },
    minPrice: Number,
    maxPrice: Number,
    deleted_at: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    owner: {
        _id: mongoose.ObjectId,
        email: String,
        username: String,
    }
})

module.exports = mongoose.model('Item', ItemSchema)
