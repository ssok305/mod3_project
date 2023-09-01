import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Initial form state with empty values for username, password, and email

let emptyForm = {
  username: "",
  password: "",
  email: "",
};

// Login component definition
function Login({ setUser }) {
  const navigate = useNavigate();

  // State to hold the form data, initialized with emptyForm
  let [form, setForm] = useState(emptyForm);

  // Function to handle input changes and update the form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Send a POST request to the server to authenticate user
      const authResponse = await axios.post("/auth/login", form);
      const token = authResponse.data.token;

      if (!token) {
        setForm(emptyForm); // Reset the form if authentication fails
        return;
      }

      // If authentication is successful, store the token in local storage
      localStorage.setItem("token", token);

      // Send a GET request to fetch user data using the stored token
      const userResponse = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update the user context with the fetched user data
      setUser(userResponse.data);

      // Navigate the user to the "/posts" route
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error); // Display an alert with the error message
    }
  };

  // JSX rendering of the Login component
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      {/* Include the WaveSVG component */}
      <WaveSVG />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
