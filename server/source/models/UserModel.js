const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 18,
    unique: true,
  },
  password: {type: String, required: true},
  savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
});

const UserModel = mongoose.model("user", user);

module.exports = UserModel;
