const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//
const secret_key = process.env.SECRET_KEY;
console.log(secret_key);
//
const login = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await UserModel.findOne({username});

    if (!user) {
      return res.json({message: "there's no person with this name."});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.json({message: "the password or username is inCorrect."});
    }

    const token = await jwt.sign({token: user._id}, secret_key);

    return res.json({
      message: "you logged in successfully.",
      token,
      userId: user._id,
    });
  } catch (err) {
    return res.json({message: err + "WTF"});
  }
};

module.exports = login;
