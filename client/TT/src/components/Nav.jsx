import React from "react";
import {useCookies} from "react-cookie";
import useGetUserId from "../hooks/useGetUserId";

export default function Nav() {
  const [cookie, setCookie] = useCookies(["token_access"]);
  const userId = useGetUserId();
  const handleLogout = () => {
    setCookie(["token_access"], "");
    window.localStorage.removeItem("userId");
  };

  return (
    <div className="flex items-center justify-center gap-10 bg-[#e9e9e9] shaodw-lg p-5 font-bold decoration-white">
      <a href="/" to={"/"}>
        Home
      </a>

      <a href="/create-recipe" to={"/create-recipe"}>
        Create Recipe
      </a>
      <a href="/saved-recipes" to={"/saved-recipes"}>
        Saved Recipes
      </a>
      {cookie.token_access ? (
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 text-black border-2 border-black/20 hover:bg-red-800  hover:text-white rounded-md "
        >
          Logout
        </button>
      ) : (
        <a href="/auth" to={"/auth"}>
          Login/Register
        </a>
      )}
    </div>
  );
}
