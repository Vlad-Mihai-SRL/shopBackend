function getAllProducts(model, req, res) {
  model.find({}).then((data, err) => {
    console.log(data);
    res.status(200).send(data);
  });
}
function getProductById(model, req, res) {
  model.findOne({ _id: req.params.id }).then((data, err) => {
    if (data && !err) {
      res.status(200).send(data);
    } else {
      res
        .status(500)
        .send({ error: `No product found with id ${req.params.id}` });
    }
  });
}
function addProduct(model, req, res) {
  console.log(req.body);
  req.body.product.save(function (err, product) {
    if (err) return console.error(err);
    console.log(product);
  });
}
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
