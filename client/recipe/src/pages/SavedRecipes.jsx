import axios from "axios";
import React, {useEffect, useState} from "react";
import useGetUserId from "../hooks/useGetUserId";
const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const userId = useGetUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/recipes/getSavedRecipes", {userId});
        console.log(res.data);
        setRecipes([...res.data.Recipes]);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const removeData = async (recipeId) => {
    try {
      const res = await axios.post("/recipes/removeFromSave", {
        userId,
        recipeId,
      });
      setRecipes(res.data.recipes);
    } catch (error) {}
  };

  return (
    <div>
      {recipes.length > 0 ? (
        recipes?.map((item) => {
          return (
            <div className="flex flex-col items-center justify-center gap-4 my-10">
              <img className="w-[350px] " src={item.imageUrl} />
              <p>name :{item.name}</p>
              <button
                onClick={() => removeData(item._id)}
                className="bg-[#e8e8e8] text-black border-2 px-6 py-2 rounded-md border-black/80"
              >
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <div className="text-3xl text-center flex items-center justify-center h-screen text-red-600 font-bold">
          There's No Saved Recipes.
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
