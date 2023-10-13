const jwt = require("jsonwebtoken");
const UserModel = require("../models/USER");
const bcyrpt = require("bcrypt");
require("dotenv").config();

const login = async (req, res) => {
  const {username, password} = req.body;
  try {
    const isExist = await UserModel.findOne({username});
    if (!isExist) {
      return res.json({message: "THIS USER NAME IS NOT EXIST."});
    }
    const isValidPassword = await bcyrpt.compare(password, isExist.password);
    if (!isValidPassword) {
      return res.json({message: "The Username Or The Password Is Incorrect."});
    }
    const token = await jwt.sign(
      {token: isExist._id},
      process.env.JWT_SECRET_KEY
    );
    console.log(token);
    return res.json({
      message: "You've Logged In Successfully.",
      token,
      id: isExist._id,
    });
  } catch (error) {
    return res.json({messgae: error});
  }
};

module.exports = login;
