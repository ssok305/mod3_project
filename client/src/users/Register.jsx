import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = {
  username: "",
  password: "",
  email: "",
};

function Register({ setUser }) {
  const navigate = useNavigate();

  // State for storing the form data
  let [form, setForm] = useState(emptyForm);

  // Function to update form state when input values change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the "/auth/register" endpoint with the form data
      const authResponse = await axios.post("/auth/register", form);
      const token = authResponse.data.token;

      // If no token is returned, clear the form and exit the function
      if (!token) {
        setForm(emptyForm);
        return;
      }

      // Store the token in the browser's local storage
      localStorage.setItem("token", token);

      // Send a GET request to "/api/users" to fetch user data using the token for authentication
      const userResponse = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Set the user state with the fetched user data
      setUser(userResponse.data);

      // Navigate to the "/posts" route
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="my-32">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label
          className=" text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
          htmlFor="username"
        >
          Username:
        </label>
        <br />
        <input
          className="mt-4 w-full rounded border-2 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <br />
        <br />
        <label
          className=" text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
          htmlFor="email"
        >
          Email:
        </label>
        <br />
        <input
          className="mt-4 w-full rounded border-2 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <br />
        <br />
        <label
          className=" text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"
          htmlFor="password"
        >
          Password:
        </label>
        <br />
        <input
          className="mt-4 w-full rounded border-2 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <br />
        <br />
        <button className="bg-lime-600 inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00 ] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
