import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./users/Register";
import Login from "./users/Login";
import HomePage from "./pages/HomePage.jsx";

import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authenicated, setAuthenicated] = useState(false);

  async function getUser() {
    try {
      const response = await axios.get("api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setUser(response.data);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  let loggedIn = user.username;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {loggedIn ? (
          <>
            <Route path="/homepage" element={<HomePage to="/homepage" />} />
            {!isLoading && (
              <Route path="*" element={<Navigate to="/homepage" />} />
            )}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            {!isLoading && (
              <Route path="*" element={<Navigate to="/Login" />} />
            )}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
