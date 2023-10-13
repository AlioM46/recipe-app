const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: {type: String, required: true},
  ingredients: [{type: String}],
  instructions: String,
  cookingTime: String,
  description: String,
  imageUrl: String,
  recipeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const RecipeModel = mongoose.model("recipe", recipeSchema);

module.exports = RecipeModel;
