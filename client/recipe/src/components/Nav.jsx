import React from "react";
import {useCookies} from "react-cookie";
const Nav = () => {
  const [cookies, setCookies] = useCookies(["token_access"]);
  return (
    <div className="text-center flex gap-5 justify-around justify-center py-10 px-4 text-2xl bg-black/80">
      <a href="/">Home</a>
      <div>
        {cookies.token_access ? (
          <button
            onClick={() => {
              setCookies(["token_access"], "");
              window.localStorage.removeItem("userId");
            }}
            className="px-5 py-2 bg-red-600 text-white flex items-center justify-center"
          >
            Logout
          </button>
        ) : (
          <a href="/auth">Login/Register</a>
        )}
      </div>
      <a href="/saved-recipes">Saved Recipes</a>
      <a href="/create-recipe">Create Recipe</a>
    </div>
  );
};

export default Nav;
