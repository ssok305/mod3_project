import React from "react";
import Navbar from "../components/NavBar";
import WaveSVG from "../components/WaveSVG";

import { useState } from "react";

function HomePage() {
  const [user, setUser] = useState({});
  let loggedIn = user.username;
  return (
    <div className="min-h-screen relative flex justify-center">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-blue-600 bg-gradient-to-b from-[rgba(14,65,102,0.86)] to-[#0e4166] box-border block z-0">
        <WaveSVG />
      </div>
      <div className="z-20">
        <Navbar username={loggedIn} setUser={setUser} />
      </div>
    </div>
  );
}
export default HomePage;
