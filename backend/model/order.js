const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: String, required: true },
    customerId: { type: String },
    phone: { type: String, required: true },
    paymentIntentId: { type: String },
    products: [{
        id: { type: Number },
        name: { type: String },
        image: { type: String },
        category: { type: String },
        sub_category: { type: String },
        price: { type: Number },
        quantity: { type: String }
    }],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true }
    },
    payment_status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;


module.exports = Order;