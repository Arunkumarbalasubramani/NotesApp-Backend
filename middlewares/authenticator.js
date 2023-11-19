const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(400).send("Invalid Token");
    }
    if (data) {
      req.body.user = data.id;
      next();
    } else {
      res.status(400).send({ Message: "Token is Invalid. Please Login again" });
    }
  });
}

module.exports = { authenticator };
