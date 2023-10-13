const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
