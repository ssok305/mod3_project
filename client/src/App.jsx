import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./users/Login";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});

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
  }

  useEffect(() => {
    console.log("page loaded");
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
