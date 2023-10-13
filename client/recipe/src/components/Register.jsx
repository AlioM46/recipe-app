import React, {useState} from "react";
import axios from "axios";
//
const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        password,
        username,
      });
      if (response.data.message == "User created Successfully.") {
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
    <div className="col-span-1 bg-[#eee] w-full flex items-center justify-center  py-12 ">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <label
            className="mt-2 font-bold text-2xl font-mono"
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            className="rounded-md px-5 py-2 text-black focus:outline-none caret-black"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </div>
        <div className="flex gap-5">
          <label
            className="mt-2 font-bold text-2xl font-mono"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            className="rounded-md px-5 py-2 text-black focus:outline-none caret-black"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-[#333] text-white  rounded-md  text-2xl "
        >
          Create Account
        </button>
        <h2 className="text-green-600">{message}</h2>
        <h2 className="text-red-600">{error}</h2>
      </form>
    </div>
  );
};

export default Register;
