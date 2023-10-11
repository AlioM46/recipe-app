const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const {username, password} = req.body;
  try {
    if (!username || !password) {
      return res.json({message: "please provide username and password."});
    }

    const isExist = await UserModel.findOne({username});
    if (isExist) {
      return res.json({message: "user is already exist"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const singNewUser = UserModel({
      username,
      password: hashedPassword,
    });
    await singNewUser.save();
    return res.json({message: "user added successfully."});
  } catch (error) {
    return res.json({message: error});
  }
};

module.exports = register;
