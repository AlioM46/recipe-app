import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
const Auth = () => {
  return (
    <div className="grid sm:grid-cols-2  place-items-center">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;
