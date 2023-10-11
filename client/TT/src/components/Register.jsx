import React, {useEffect, useState} from "react";
import axios from "axios";
export default function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState("");
  const [users, setUsers] = useState([]);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/auth/register", {username, password});
      setState(res.data.message);
      setTimeout(() => {
        setState("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:col-span-1 w-full  bg-[#777] border-2 p-10 text-white border-black/20 duration-200 hover:border-black">
      <div>
        <form
          onSubmit={handleRegister}
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
            REGISTER NOW!
          </button>

          {state ? <h2 className="text-3xl">{state}</h2> : ""}
        </form>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 border-2 border-black">
        {users.map((item) => {
          return (
            <div className="px-10 max-w-full my-10">
              <p>{item.username}</p>
              <p className="break-words">PASSWORD::::{item.password}</p>
              <p>{item._id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
