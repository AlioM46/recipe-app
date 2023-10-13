import React, {useEffect, useState} from "react";
import axios from "axios";
import useGetUserId from "../hooks/useGetUserId";
import {useCookies} from "react-cookie";
const Home = () => {
  const [cookies, setCookies] = useCookies(["token_access"]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const userId = useGetUserId();
  useEffect(() => {
    const FetchRecipes = async () => {
      try {
        const res = await axios.get("/recipes");
        setRecipes(res.data.recipes);
      } catch (error) {}
    };
    FetchRecipes();
  }, []);
  console.log(recipes);

  const handleSave = async (recipeId) => {
    if (!cookies.token_access) {
      setError("You need to login to save Recipe.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    try {
      const res = await axios.post("/recipes/saveRecipe", {recipeId, userId});
      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="fixed  left-1/2 top-1/2 text-3xl text-red-600 -translate-x-1/2 -translate-y-1/2">
        {error}
      </div>{" "}
      {recipes?.map((item) => {
        return (
          <div className="flex flex-col my-10 items-center ">
            <img className="max-w-[500px]" src={item?.imageUrl} />
            <div className="flex flex-wrap gap-5 max-w-[250px] justify-center items-center ">
              <p>Name : {item.name}</p>
              <p>Description : {item.description}</p>
              <p>Instructions : {item.instructions}</p>
              {item.ingredients.map((item) => {
                return <p>{item}</p>;
              })}
              <p>Cooking Time: {item.cookingTime}</p>
            </div>
            <button
              onClick={() => handleSave(item._id)}
              className="my-2 px-6 py-2 bg-[#e8e8e8] rounded-md border-2 border-black/50"
            >
              SAVE
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
