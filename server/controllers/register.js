const UserModel = require("../models/USER.js");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  console.log("hello world");
  const {username, password} = req.body;
  try {
    const isExist = await UserModel.findOne({username});
    if (isExist) {
      return res.json({message: "THIS USERNAME IS ALREADY TAKEN."});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = UserModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({message: "User created Successfully."});
  } catch (error) {
    return res.json({error});
  }
};
module.exports = register;
