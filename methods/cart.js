const jwt = require("jsonwebtoken");
const { Order } = require("../schemes/order");
const { Product } = require("../schemes/product");
const { userSchema, User } = require("../schemes/user");
var mongoose = require("mongoose");
function createOrder(orderModel, req, res) {
  let token = req.body.token;
  let order = req.body.order;
  try {
    let decoded = jwt.verify(token, process.env.TOKEN_KEY);
    let cart = order.Cart;
    let totalAmmout = 0;
    let ids = [];
    for (let key in cart) {
      ids.push(mongoose.Types.ObjectId(key));
    }
    ///validate cart
    Product.find({ _id: { $in: ids } }, (err, data) => {
      for (let item of data) totalAmmout += item.currentPrice * cart[item._id];
      let newOrder = new Order({
        userId: decoded.user_id,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        Cart: cart,
        totalAmmount: totalAmmout,
        currency: order.currency,
      });

      User.findOne(
        { id: decoded._id, email: decoded.email, password: decoded.password },
        (err, data) => {
          if (err || !data) res.status(404).send({ error: err });
          else
            newOrder.save((err, data) => {
              console.log(data);
              if (err || !data) res.status(500).send({ error: err });
              else res.status(200).send({ data: data });
            });
        }
      );
    });
  } catch (e) {
    console.log(e);
    res.status(404).send({ error: e });
  }
}

exports.createOrder = createOrder;
