const mongoose = require('mongoose')

const HostelSchema = mongoose.Schema({
    name: { type: String, required: true }

}, { timestamps: true }
)

module.exports = mongoose.model('Hostel', HostelSchema)