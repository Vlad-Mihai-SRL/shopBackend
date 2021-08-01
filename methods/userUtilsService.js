const jwt = require("jsonwebtoken");

function isUserAdmin(token) {
  try {
    let decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (decoded.isAdmin && decoded.isAdmin == true) return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

exports.isUserAdmin = isUserAdmin;
