import React from "react";

import { logo } from "../images";

function Navbar() {
  return (
    <div className="h-16 w-auto rounded-lg flex justify-between items-center p-2 bg-white">
      <img className="h-12 w-auto pl-5 " src={logo} alt="ikan" />
      <div className="h-full w-96 text-lg  flex justify-between">
        <button className="px-4 font-bold border-b-4 border-saffron">
          Home
        </button>
        <button className="px-4">About Us</button>
        <button className="px-4">Profile</button>
      </div>
      <button className="h-full w-36 bg-black text-white rounded-md">
        Events
      </button>
    </div>
  );
}

export default Navbar;
