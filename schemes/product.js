const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  categories: [String],
  name: { type: String, required: true },
  listPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  thumbnail: String,
  description: String,
  pictures: [String],
  reviews: Number,
  reviewsFull: [
    {
      name: String,
      rating: Number,
      comment: String,
    },
  ],
  specialAttributes: {
    field: {
      title: String,
    },
  },
});
// - Product: {
// 	id: unique,
// 	categories: [id],
// 	name: String,
// 	listPrice: Float,
// currentPrice: Float,
// thumbnail: [],
// 	description: html,
// 	pictures: [],
// 	reviews: Float,
// 	reviewsFull: [{Name, Float, String}],
// 	specialAttributes: {},
// }
const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.productSchema = productSchema;
