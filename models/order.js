const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    userCity: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    products: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          totalPrice: {
            type: Number,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          weight: {
            type: String,
            required: false,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    total: {
        type: Number,
        required: true
    }


}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
