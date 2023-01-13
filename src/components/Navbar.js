import React, { useState } from "react";

import { logo } from "../images";
import { menu, close } from "../images/icons";

function Navbar({ Page }) {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <div>
      {/* big navbar */}
      <div className="hidden md:h-16 md:w-auto z-20 rounded-lg md:flex justify-between items-center p-2 bg-white">
        <a href="/">
          <img className="h-12 w-auto pl-4 " src={logo} alt="ikan" />
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
      {/* small navbar */}
      <div className="md:hidden z-10 h-12 rounded-lg w-full bg-white flex justify-center items-center">
        <img className="h-10 w-auto pl-5" src={logo} alt="ikan" />
        <img
          className="h-7 absolute right-8 w-auto"
          src={!open ? menu : close}
          onClick={() => setOpen(!open)}
          alt="menu"
        />
      </div>

      {/* small navbar menu */}
      {open ? (
        <div className="md:hidden h-full w-screen bg-white absolute -ml-4 top-0">
          <img
            className="h-7 absolute top-6 right-8 w-auto"
            src={close}
            onClick={() => setOpen(!open)}
            alt="menu"
          />
          <div className="absolute h-full text-2xl flex flex-col left-12 justify-center gap-4">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/profile">Profile</a>
            <a href="/events">Events</a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
