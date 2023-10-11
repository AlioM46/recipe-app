import React, {useEffect, useState} from "react";
import useGetUserId from "../hooks/useGetUserId";
import axios from "axios";
import {useCookies} from "react-cookie";
const CreateRecipe = () => {
  const userId = useGetUserId();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    recipeOwner: userId,
  });
  const [cookie, _] = useCookies(["token_access"]);
  const [state, setState] = useState("");

  const handleChange = (event) => {
    const {name, value} = event.target;

    setRecipe({...recipe, [name]: value});
  };

  const handleAddIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
  };

  const handleChangeIngredients = (value, index) => {
    const newIngridients = [...recipe.ingredients];
    newIngridients[index] = value;
    setRecipe({...recipe, ingredients: newIngridients});
    console.log(recipe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/recipes",
        {...recipe},
        {headers: {auth: cookie.token_access}}
      );

      if (response.status == 200) {
        setState("Recipe Added Successfully.");
        setTimeout(() => {
          setState("");
        }, 3000);
      }
    } catch (error) {}
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" addRecipe flex flex-col items-center justify-center my-20 gap-4 border-2 border-black/20 py-10 "
      >
        <h2 className="text-3xl text-red-500 ">{state}</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={recipe.name}
        />
        {/*  */}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          value={recipe.description}
        />
        {/*  */}
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((item, index) => {
          return (
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              onChange={(event) =>
                handleChangeIngredients(event.target.value, index)
              }
              value={item}
            />
          );
        })}
        <button
          className="border-2 border-black/50 hover:bg-gray-400 px-5 py-2 hover:text-white duration-200"
          type="button"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>
        {/*  */}
        <label htmlFor="instructions">Instructions</label>
        <input
          type="text"
          name="instructions"
          id="instructions"
          onChange={handleChange}
          value={recipe.instructions}
        />
        {/*  */}
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleChange}
          value={recipe.imageUrl}
        />
        {/*  */}
        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          type="text"
          name="cookingTime"
          id="cookingTime"
          onChange={handleChange}
          value={recipe.cookingTime}
        />
        {/*  */}
        {/* <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={recipe.name}
        /> */}
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
