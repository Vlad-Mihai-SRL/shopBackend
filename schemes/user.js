const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
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
  Preferences: [
    {
      id: String,
      responses: [Number],
    },
  ],
  Cart: {},
});

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User;
