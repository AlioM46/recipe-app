import React, {useEffect, useState} from "react";
import axios from "axios";
import useGetUserId from "../hooks/useGetUserId";
// ;
export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      console.log(userId);
      try {
        const res = await axios.get(`/recipes/saved/${userId}`);
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {}
    };
    fetchSavedRecipes();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-10">
      {savedRecipes.map((item) => {
        return (
          <div className="border-2 border-black p-5">
            <p>{item.name}</p>
            <img src={item.imageUrl} alt="" />
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
