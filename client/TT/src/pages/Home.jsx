import axios from "axios";
import React, {useEffect, useState} from "react";
import useGetUserId from "../hooks/useGetUserId";
export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const userId = useGetUserId();

  useEffect(() => {
    console.log(userId);
    const FetchRecipes = async () => {
      const recipes = await axios.get("/recipes");
      setRecipes([...recipes.data.Recipes]);
    };

    FetchRecipes();
  }, []);

  // const handleSave = (event) => {};

  const saveRecipe = async (recipeId, userId) => {
    try {
      const res = await axios.put("/recipes", {userId, recipeId});
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(recipes);
  return (
    <div className="flex flex-col items-center justify-center gap-14 py-20">
      {recipes?.map((item, index) => {
        return (
          <div className="">
            <img src={item.imageUrl} />
            <div>
              <p>Name: {item.name}</p>
              <p>Cooking Time: {item.cookingTime}</p>
            </div>
            <p>Description : {item.description}</p>
            <div>
              ingredients:
              {item.ingredients.map((item) => {
                return <span> {item}</span>;
              })}
            </div>
            <p>{item.instructions}</p>
            <button
              onClick={() => saveRecipe(item._id, userId)}
              className=" active:bg-gray-500 duration-200 active:text-white px-5 py-2 border-2 border-black rounded-lg bg-[#eee]"
            >
              SAVE
            </button>
          </div>
        );
      })}
    </div>
  );
}
