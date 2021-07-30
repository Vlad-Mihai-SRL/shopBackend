const User=require('./schemes/user').User;
const Product = mongoose.model('Product' , productSchema).Product;

exports.User=User;
exports.Product=Product;