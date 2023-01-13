import React from "react";

import { logo } from "../images";

function Navbar({ Page }) {
  return (
    <div className="h-16 w-auto z-20 rounded-lg flex justify-between items-center p-2 bg-white">
      <a href="/">
        <img className="h-12 w-auto pl-5 " src={logo} alt="ikan" />
      </a>
      <div className="h-full w-96 text-lg  flex justify-between">
        <a
          href="/"
          className={
            Page === "home"
              ? "flex justify-center items-center px-4 font-bold border-b-4 border-saffron"
              : "flex justify-center items-center px-4"
          }
        >
          Home
        </a>
        <a
          href="/about"
          className={
            Page === "about"
              ? "flex justify-center items-center px-4 font-bold border-b-4 border-saffron"
              : "flex justify-center items-center px-4"
          }
        >
          About Us
        </a>
        <a
          href="profile"
          className={
            Page === "profile"
              ? "flex justify-center items-center px-4 font-bold border-b-4 border-saffron"
              : "flex justify-center items-center px-4"
          }
        >
          Profile
        </a>
      </div>
      <a
        href="/events"
        className={
          Page === "events"
            ? "h-full w-36 bg-white text-black rounded-md flex justify-center items-center border-2 border-black "
            : "h-full w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2"
        }
      >
        Events
      </a>
    </div>
  );
}

export default Navbar;
