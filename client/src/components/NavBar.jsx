import { Link } from "react-router-dom";
import icon from "../assets/react.svg";

function Navbar({ setUser, username }) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="ml-4">
          <Link to="/">
            <img src={icon} alt="React Icon" id="icon" />
          </Link>
        </div>
        <div className="mr-4">
          <span onClick={logout} className="text-white hover:underline">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
