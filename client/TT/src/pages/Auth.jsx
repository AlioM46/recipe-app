import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";
export default function Auth() {
  return (
    <div className="grid lg:grid-cols-2 gap-14 m-10   ">
      <Login />
      <h2 className=" hidden lg:block absolute text-3xl font-bold left-1/2 top-1/3  -translate-x-1/2 -translate-y-1/2">
        OR
      </h2>
      <Register />
    </div>
  );
}
