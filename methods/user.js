const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const userUtils = require("./userUtilsService");
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
                let isAdmin = false;
                if (
                    email == "mihai.indreias@gmail.com" ||
                    email == "vlad.cainamisir@gmail.com"
                )
                    isAdmin = true;
                const token = jwt.sign(
                    {
                        user_id: data._id,
                        email: email,
                        verified: data.verified,
                        password: sha256(password),
                        isAdmin: isAdmin,
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "256h",
                    }
                );
                console.log(token);
                res.status(200).send({ token: token });
            } else {
                res.status(500).send({
                    error: "Could not find this user/password combination",
                });
            }
        });
}

function getPersonalInfo(model, req, res) {
    let userToken = req.params.token;
    try {
        let decoded = jwt.verify(userToken, process.env.TOKEN_KEY);
        model
            .findOne({
                _id: decoded.user_id,
                email: decoded.email,
                password: decoded.password,
            })
            .then((data, err) => {
                if (data && !err) {
                    console.log(data);
                    res.status(200).send(data);
                } else
                    res.status(404).send({
                        error: "Could not find user with this id/email",
                    });
            });
    } catch (e) {
        console.log(e);
        res.status(404).send({ error: e });
    }
}

function updatePersonalInformation(model, req, res) {
    let userToken = req.body.token;
    try {
        let decoded = jwt.verify(userToken, process.env.TOKEN_KEY);
        let newUserInfo = req.body.userInfo;
        let userDocument = new model(newUserInfo);
        console.log(newUserInfo, userDocument);
        delete newUserInfo.verified;
        delete newUserInfo._id;
        delete newUserInfo.password;
        model.findOneAndUpdate(
            {
                _id: decoded.user_id,
                email: decoded.email,
                password: decoded.password,
            },
            newUserInfo,
            (err, data) => {
                if (err || !data)
                    console.log(err), res.status(500).send({ error: err });
                else
                    res.status(200).send({
                        response: "Successfully updated user information",
                    });
            }
        );
    } catch (e) {
        console.log(e);
        res.status(404).send({ error: e });
    }
}

function addToCart(userModel, productModel, req, res) {
    let userToken = req.body.token;
    let productID = req.body.productId;
    let quantity = Number(req.body.quantity);
    let updateString = `Cart.${productID}`;
    productModel.findOne({ _id: productID }, (err, data) => {
        console.log(data, err);
        if (err || !data) {
            res.status(400).send({ error: "Invalid product id" });
        } else {
            try {
                let decoded = jwt.verify(userToken, process.env.TOKEN_KEY);
                userModel.findOne(
                    {
                        _id: decoded.user_id,
                        email: decoded.email,
                        password: decoded.password,
                    },
                    (err, data) => {
                        if (!data.Cart) data.Cart = {};
                        if (err || !data) {
                            console.log(err),
                                res.status(500).send({ error: err });
                        } else {
                            if (data.Cart[productID])
                                data.Cart[productID] += quantity;
                            else data.Cart[productID] = quantity;
                            userModel.findOneAndUpdate(
                                {
                                    _id: decoded.user_id,
                                    email: decoded.email,
                                    password: decoded.password,
                                },
                                { $set: { Cart: data.Cart } },
                                (err, dataN) => {
                                    if (err || !dataN) {
                                        console.log(err),
                                            res
                                                .status(500)
                                                .send({ error: err });
                                    } else
                                        res.status(200).send({
                                            response: "Item added to cart",
                                        });
                                }
                            );
                        }
                    }
                );
            } catch (e) {
                console.log(e);
                res.status(500).send({ error: e });
            }
        }
    });
}

function removeFromCart(userModel, productModel, req, res) {
    let userToken = req.body.token;
    let productID = req.body.productId;
    let quantity = Number(req.body.quantity);
    let updateString = `Cart.${productID}`;
    productModel.findOne({ _id: productID }, (err, data) => {
        console.log(data, err);
        if (err || !data) {
            res.status(400).send({ error: "Invalid product id" });
        } else {
            try {
                let decoded = jwt.verify(userToken, process.env.TOKEN_KEY);
                userModel.findOne(
                    {
                        _id: decoded.user_id,
                        email: decoded.email,
                        password: decoded.password,
                    },
                    (err, data) => {
                        if (!data.Cart) data.Cart = {};
                        if (err || !data) {
                            console.log(err),
                                res.status(500).send({ error: err });
                        } else {
                            if (data.Cart[productID]) {
                                data.Cart[productID] -= quantity;
                                if (data.Cart[productID] <= 0)
                                    delete data.Cart[productID];
                            }
                            userModel.findOneAndUpdate(
                                {
                                    _id: decoded.user_id,
                                    email: decoded.email,
                                    password: decoded.password,
                                },
                                { $set: { Cart: data.Cart } },
                                (err, dataN) => {
                                    if (err || !dataN) {
                                        console.log(err),
                                            res
                                                .status(500)
                                                .send({ error: err });
                                    } else
                                        res.status(200).send({
                                            response: "Item removed from cart",
                                        });
                                }
                            );
                        }
                    }
                );
            } catch (e) {
                console.log(e);
                res.status(500).send({ error: e });
            }
        }
    });
}

exports.removeFromCart = removeFromCart;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getPersonalInfo = getPersonalInfo;
exports.updatePersonalInformation = updatePersonalInformation;
exports.addToCart = addToCart;
