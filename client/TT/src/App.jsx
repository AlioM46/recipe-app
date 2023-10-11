import React from "react";
import Nav from "./components/Nav";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="">
      <Nav />

    </div>
  );
};

export default App;
