const express = require("express");
const router = express.Router();
const RecipeModel = require("../models/RECIPE.js");
const UserModel = require("../models/USER");
const verifyToken = require("../controllers/verifyToken.js");
router.get("/", async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find({});
    return res.json({message: "Fetch Recipes Is Done ", recipes: allRecipes});
  } catch (err) {
    return res.json({message: "Fetch Recipes Is Failed."});
  }
});
router.post("/createRecipe", verifyToken, async (req, res) => {
  try {
    const newRecipe = RecipeModel(req.body);
    await newRecipe.save();
    return res.json({messgae: "Create Recipe Is Done ", newRecipe});
  } catch (error) {
    return res.json({messgae: "Create Recipe Is Failed."});
  }
});
//
router.post("/getSavedRecipes", async (req, res) => {
  const userId = req.body;
  try {
    const user = await UserModel.findById(userId.userId);
    const Recipes = await RecipeModel.find({_id: {$in: user.savedRecipes}});

    return res.json({
      messgae: "success",
      Recipes,
    });
  } catch (error) {
    return res.json({message: "Failed!"});
  }
});
router.post("/saveRecipe", async (req, res) => {
  const {recipeId, userId} = req.body;
  console.log(recipeId, userId);

  try {
    const recipe = await RecipeModel.findById(recipeId);
    const user = await UserModel.findById(userId);

    if (user.savedRecipes.includes(recipeId)) {
      return res.json("It's Exist");
    }

    user.savedRecipes.push(recipe);
    await user.save();
    return res.json({
      message: "The Recipe Saved Successfully.",
      savedRecipe: recipe,
      user,
    });
  } catch (error) {
    return res.json({messgae: "Save Recipe Is Failed."});
  }
});

router.get("/savedRecipes/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({messgae: "User Is undefind"});
    }

    const Recipes = await RecipeModel.find({_id: {$in: user.savedRecipes}});

    return res.json({recipes: Recipes});
  } catch (error) {
    return res.json({messgae: "Failed."});
  }
});

router.post("/removeFromSave", async (req, res) => {
  //
  const {userId, recipeId} = req.body;
  console.log(userId, recipeId);
  try {
    const user = await UserModel.findById(userId);

    user.savedRecipes = user.savedRecipes.filter(
      (item) => item._id != recipeId
    ); // Replace recipeId with your condition

    await user.save();

    const recipes = await RecipeModel.find({_id: {$in: user.savedRecipes}});
    return res.json({message: "success", recipes});
  } catch (error) {
    return res.json({message: "Faild!"});
  }
});
module.exports = router;
