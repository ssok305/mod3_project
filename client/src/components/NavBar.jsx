import { Link } from "react-router-dom";
import icon from "../assets/react.svg";

function Navbar({ setUser, username }) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <ul id="navbar" className="flex justify-between">
      <li className="">
        <Link to="/">
          <img src={icon} alt="React Icon" id="icon" />
        </Link>
      </li>
      <div className="flex space-x-4">
        <li></li>
        <li onClick={logout} className="hover:underline">
          Logout
        </li>
      </div>
    </ul>
  );
}

export default Navbar;
