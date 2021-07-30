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
      console.log(err);
      res
        .status(500)
        .send({ error: `No product found with id ${req.params.id}` });
    }
  });
}
function addProduct(model, req, res) {
  product = new model(req.body.product);
  product.save(function (err, product) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "could not create object", reason: err?._message });
    } else {
      res.status(200).send(product);
    }
  });
}
function updateProductById(model, req, res) {
  if (req.body._id) {
    model
      .updateOne({ _id: req.body._id }, req.body.product)
      .then((data, err) => {
        if (data && !err) {
          console.log(data);
          res.status(200).send(data);
        } else {
          console.log(data, err);
          res.status(500).send(err);
        }
      });
  } else {
    res.status(404).send("No id found");
  }
}
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.updateProductById = updateProductById;
