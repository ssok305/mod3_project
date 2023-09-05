import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WaveSVG from "../components/WaveSVG";
import baseURL from "../components/baseURL";

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

      navigate("/homepage");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 bg-gradient-to-b from-[rgba(14,65,102,0.86)] to-[#0e4166] box-border block z-0">
        <WaveSVG />
      </div>
      <div className="z-20 p-8 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-2xl mb-4 text-white-600">Register:</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-2 p-2 "
            >
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full p-2 border rounded"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 p-2 "
            >
              Email:
            </label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 p-2 "
            >
              Password:
            </label>
            <input
              className="w-full p-2 border rounded"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div className="space-y-3">
            <button type="submit" className="w-full p-2 bg-blue-500 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
