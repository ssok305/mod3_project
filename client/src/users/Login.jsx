import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WaveSVG from "../components/WaveSVG";

// Initial form state with empty values for username, password, and email

let emptyForm = {
  username: "",
  password: "",
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
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 bg-gradient-to-b from-[rgba(14,65,102,0.86)] to-[#0e4166] box-border block z-0">
        <WaveSVG />
      </div>
      <div className="z-20 p-8 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-2xl mb-4 text-white-600">Login</h1>{" "}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-2 p-2 "
            >
              Username
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
              htmlFor="password"
              className="block text-sm font-semibold mb-2 p-2 "
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 border rounded"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500  rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
