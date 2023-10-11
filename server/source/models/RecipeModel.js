const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: {required: true, maxLength: 28, type: String},
  ingredients: [String],
  instructions: String,
  description: String,
  cookingTime: String,
  imageUrl: String,
  recipeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const RecipeModel = mongoose.model("recipes", recipeSchema);

module.exports = RecipeModel;
