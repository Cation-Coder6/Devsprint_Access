const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    image: { type: String, required: true }
})

module.exports = mongoose.model('Category', CategorySchema)