const RecipeModel = require("../models/RecipeModel.js");

const express = require("express");
const UserModel = require("../models/UserModel.js");
const verifyToken = require("../controllers/verifyToken.js");
const router = express.Router();

//================================// Add Recipes //================================\\
router.post("/", verifyToken, async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const newRecipe = new RecipeModel(data);
    await newRecipe.save();
    return res.status(200).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Try Again");
  }
});

//================================// Add To Save <Button> //================================\\
router.put("/", async (req, res) => {
  const {userId, recipeId} = req.body;
  try {
    const user = await UserModel.findById(userId);
    const recipe = await RecipeModel.findById(recipeId);

    user.savedRecipes.push(recipe);

    await user.save();

    console.log(user);
    return res.json({message: "Added Successfully."});
  } catch (error) {
    return res.json({message: "error on save"});
  }
});

router.get("/", async (req, res) => {
  try {
    const Recipes = await RecipeModel.find({});
    return res.json({Recipes});
  } catch (error) {
    return res.json(error);
  }
});
router.get("/saved/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const savedRecipes = await UserModel.findById(id);

    if (!savedRecipes) {
      return res.json({message: "You Don't Have Saved Recipes.!"});
    }

    const ObjectOfSavedRecipes = await RecipeModel.find({
      _id: {$in: savedRecipes.savedRecipes},
    });

    console.log(ObjectOfSavedRecipes);
    return res.json({savedRecipes: ObjectOfSavedRecipes});
  } catch (error) {}
});

//================================// Add Recipes to specific User. //================================\\

module.exports = router;
