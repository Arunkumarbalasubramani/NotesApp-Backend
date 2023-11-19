const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.token;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(400).send("Invalid Token", err);
    }

    if (!data) {
      return res
        .status(400)
        .send({ Message: "Token is Invalid. Please Login again" });
    }

    req.body.user = data.id;
    next();
  });
}
module.exports = { authenticator };
