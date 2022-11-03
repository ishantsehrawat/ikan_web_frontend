import React from "react";

import { logo } from "../images";

function Navbar({ Page }) {
  return (
    <div className="h-16 w-auto rounded-lg flex justify-between items-center p-2 bg-white">
      <a href="/">
        <img className="h-12 w-auto pl-5 " src={logo} alt="ikan" />
      </a>
      <div className="h-full w-96 text-lg  flex justify-between">
        <button
          className={
            Page === "home"
              ? "px-4 font-bold border-b-4 border-saffron"
              : "px-4"
          }
        >
          Home
        </button>
        <button
          className={
            Page === "about"
              ? "px-4 font-bold border-b-4 border-saffron"
              : "px-4"
          }
        >
          About Us
        </button>
        <button
          className={
            Page === "profile"
              ? "px-4 font-bold border-b-4 border-saffron"
              : "px-4"
          }
        >
          Profile
        </button>
      </div>
      <a
        className="h-full w-36 bg-black text-white rounded-md flex justify-center items-center"
        href="/events"
      >
        Events
      </a>
    </div>
  );
}

export default Navbar;
