const mongoose = require('mongoose')
const {
    OPEN,
    CLOSE,
    SETTLED,
    AUCTION,
    RANGE,
} = require('../../constants/ItemStatus')

const { Schema } = mongoose

const ItemSchema = Schema({
    title: String,
    shortDescription: String,
    description: String,
    tags: [String],
    sellType: { type: String, enum: [RANGE, AUCTION] },
    status: { type: String, enum: [OPEN, CLOSE, SETTLED] },
    is_archive: { type: Boolean, default: false },
    minPrice: Number,
    maxPrice: Number,
    priceOffset: { type: Number, default: 0 },
    images: [
        {
            original: String,
            thumbnail: String,
        },
    ],
    deleted_at: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    owner: {
        id: mongoose.ObjectId,
        email: String,
        username: String,
    },
})

module.exports = mongoose.model('Item', ItemSchema)
