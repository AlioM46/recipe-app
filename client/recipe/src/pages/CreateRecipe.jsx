import React, {useState} from "react";
import useGetUserId from "../hooks/useGetUserId";
import axios from "axios";
import {useCookies} from "react-cookie";
const CreateRecipe = () => {
  const [cookies, setCookies] = useCookies(["token_access"]);

  //
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cookingTime, setCookingTime] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [recipeOwner, setRecipeOwner] = useState(useGetUserId());
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleChangeIngredients = (event, idx) => {
    const newArray = ingredients;
    ingredients[idx] = event.target.value;
    setIngredients(newArray);
  };
  const handleAddIngredients = (event) => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cookies.token_access) {
      setError("You need to Login To Create Recipe.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    try {
      const res = await axios.post(
        "/recipes/createRecipe",
        {
          name,
          ingredients,
          cookingTime,
          instructions,
          imageUrl,
          recipeOwner,
          description,
        },
        {headers: {auth: cookies.token_access}}
      );
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="absolute  left-1/2 top-1/2 text-3xl text-red-600 -translate-x-1/2 -translate-y-1/2">
        {error}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center  mt-10 gap-4 "
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
        </div>
        <div className="flex flex-col  justify-center">
          {ingredients.map((item, idx) => {
            return (
              <input
                type="text"
                key={idx}
                onChange={(e) => handleChangeIngredients(e, idx)}
              />
            );
          })}
          <button type="button" onClick={handleAddIngredients}>
            Add Ingredients
          </button>
        </div>
        <div>
          <label htmlFor="instructions">instructions</label>
          <input
            type="text"
            id="instructions"
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">imageUrl</label>
          <input
            type="text"
            id="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cookingTime">cookingTime</label>
          <input
            type="numbers"
            id="cookingTime"
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cookingTime">Desription</label>
          <input
            type="text"
            id="desription"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">CREATE RECIPE.</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
