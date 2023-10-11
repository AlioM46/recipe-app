import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import SavedRecipes from "./pages/SavedRecipes.jsx";
import Auth from "./pages/Auth.jsx";
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/create-recipe",
    element: <CreateRecipe />,
  },
  {
    path: "/saved-recipes",
    element: <SavedRecipes />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
