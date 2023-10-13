import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipes from "./pages/SavedRecipes";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
