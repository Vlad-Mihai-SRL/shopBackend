const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
function createUser(model, req, res) {
  let user = new model({ ...req.body, password: sha256(req.body.password) });
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

function loginUser(model, req, res) {
  let email = req.body.email;
  let password = req.body.password;
  model
    .findOne({ email: email, password: sha256(password) })
    .then((data, err) => {
      if (data && !err) {
        const token = jwt.sign(
          { user_id: data._id, email: email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "12h",
          }
        );
        console.log(token);
        res.status(200).send({ token: token });
      } else {
        res
          .status(500)
          .send({ error: "Could not find this user/password combination" });
      }
    });
}

exports.createUser = createUser;
exports.loginUser = loginUser;
