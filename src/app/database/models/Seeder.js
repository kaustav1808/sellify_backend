const mongoose = require('mongoose')

const { Schema } = mongoose

const SeederSchema = Schema({
    currentCount: { type: Number, default: 1 },
    models: Array,
    created_at: String,
})

module.exports = mongoose.model('Seeder', SeederSchema)
