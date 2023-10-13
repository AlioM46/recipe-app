const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  const Token = req.headers.auth;

  if (Token) {
    await jwt.verify(Token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) return res.status(403).send({message: "You Are Not Auth"});
      next();
    });
  } else {
    return res.status(401).send({message: "Provide A Token."});
  }
};

module.exports = verifyToken;
