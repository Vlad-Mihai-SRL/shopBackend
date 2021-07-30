function createUser(model, req, res) {
  let user = new model(req.body);
  user.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err });
    } else {
      console.log(data);
      res.status(200).send({ data: "User created successfully" });
    }
  });
}

exports.createUser = createUser;
