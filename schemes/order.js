const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  shippingAddress: {
    country: String,
    city: String,
    street: String,
    number: String,
    Zip: String,
    default: {},
  },
  billingAddress: {
    country: String,
    city: String,
    street: String,
    Zip: String,
    number: String,
    default: {},
  },
  Cart: {},
  totalAmmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    paid: { type: Boolean, default: false },
    actualStatus: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;
