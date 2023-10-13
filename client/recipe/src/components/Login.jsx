import React, {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [cookies, setCookies] = useCookies(["token_access"]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", {password, username});
      console.log(response);
      //
      window.localStorage.setItem("userId", response.data.id);
      setCookies(["token_access"], response.data.token);
      window.location.pathname = "/";
      if (response.data.message == "You've Logged In Successfully.") {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 4000);
      } else {
        setError(response.data.message);
        if (message) {
          setMessage("");
        }
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="col-span-1 border-r-2 bg-[#eee] w-full flex items-center justify-center  py-12 ">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <label
            className="mt-2 font-bold text-2xl font-mono"
            htmlFor="usernameLogin"
          >
            USERNAME
          </label>
          <input
            className="rounded-md px-5 py-2 text-black focus:outline-none caret-black"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            id="sernameLogin"
          />
        </div>
        <div className="flex gap-5">
          <label
            className="mt-2 font-bold text-2xl font-mono"
            htmlFor="passwordLogin"
          >
            PASSWORD
          </label>
          <input
            className="rounded-md px-5 py-2 text-black focus:outline-none caret-black"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            id="passwordLogin"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-[#333] text-white  rounded-md  text-2xl "
        >
          Login
        </button>
        <h2 className="text-green-600">{message}</h2>
        <h2 className="text-red-600">{error}</h2>
      </form>
    </div>
  );
};

export default Login;
