const jwt = require("jsonwebtoken");
require("dotenv").config();
//
const secret_key = process.env.SECRET_KEY;
console.log(secret_key);
//
const verifyToken = async (req, res, next) => {
  const Token = req.headers.auth;
  console.log(Token);
  if (Token) {
    jwt.verify(Token, secret_key, (err) => {
      if (err) return res.status(403).send("You are not authrazied.");
      next();
    });
  } else {
    res.status(401).send("Verify A TOken.");
  }
};

module.exports = verifyToken;
