import React, {useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState("");
  const [_, setCookies] = useCookies(["token_access"]);
  //
  const navigate = useNavigate();
  //= =#=#+#+#+#=#=#=#=#=#=#+#+#+#=#=#=#=#=#=#+#+#+#=#=#=#=#=#=#+#+#+#=#=#=#=#=#=#+#+#+#=#=#=#=#

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/auth/login", {password, username});

      console.log(res);
      setState(res.data.message);
      setTimeout(() => {
        setState("");
      }, 3000);

      window.localStorage.setItem("userId", res.data.userId);
      setCookies(["token_access"], res.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="lg:col-span-1 w-full  bg-[#777] border-2 p-10 text-white border-black/20 duration-200 hover:border-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div className="flex gap-4">
          <label>USERNAME</label>
          <input
            className="text-black font-bold px-4 py-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <label>PASSWORD</label>
          <input
            className="text-black font-bold px-4 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[#e7e7e7] border-2 border-black hover:text-indigo-500 font-bold text-black duration-200 px-5 py-2 "
        >
          LOGIN NOW!
        </button>

        {state ? <h2 className="text-3xl">{state}</h2> : ""}
      </form>
    </div>
  );
}
