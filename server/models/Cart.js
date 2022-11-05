const mongoose = require('mongoose')

const SingleOrderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
})

const CartSchema = mongoose.Schema(
    {
        orderItems: [SingleOrderItemSchema],
        status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    }, { timestamps: true }
)

module.exports = mongoose.model('Cart', CartSchema)