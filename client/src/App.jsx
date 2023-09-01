import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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
  return <></>;
}

export default App;
