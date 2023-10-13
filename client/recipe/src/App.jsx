import React from "react";
import Nav from "./components/Nav";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

const App = () => {
  return (
    <div className="text-white font-bold">
      <Nav />
    </div>
  );
};

export default App;
