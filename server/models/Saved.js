const mongoose = require('mongoose')
const ProductSchema = require('./Product')

const SavedSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [ProductSchema],

}, { timestamps: true }
)

module.exports = mongoose.model('Saved', SavedSchema)