const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: String },
                quantiy: { type: Number, default: 1 },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);