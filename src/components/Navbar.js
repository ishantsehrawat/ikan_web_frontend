import React, { useState } from "react";
import { Link } from "react-router-dom";

import { logo } from "../images";
import { menu, close } from "../images/icons";
function Navbar({ Page }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* big navbar */}
      <div className="hidden md:h-16 md:w-auto z-20 rounded-lg md:flex justify-between items-center p-2 bg-white">
        <Link to="/">
          <img className="h-12 w-auto pl-4 " src={logo} alt="ikan" />
        </Link>
        <div className="h-full w-96 text-lg  flex justify-between">
          <Link
            to="/"
            className={
              Page === "home"
                ? "flex justify-center items-center px-4 font-bold border-b-4 border-saffron"
                : "flex justify-center items-center px-4"
            }
          >
            Home
          </Link>
          <Link
            to="/about"
            className={
              Page === "about"
                ? "flex justify-center items-center px-4 font-bold border-b-4 border-saffron"
                : "flex justify-center items-center px-4"
            }
          >
            About Us
          </Link>
          <Link
            to="/profile"
            className={
              Page === "profile"
                ? "flex justify-center items-center px-4 font-bold border-b-4 border-saffron"
                : "flex justify-center items-center px-4"
            }
          >
            Profile
          </Link>
        </div>
        <Link
          to="/events"
          className={
            Page === "events"
              ? "h-full w-36 bg-white text-black rounded-md flex justify-center items-center border-2 border-black "
              : "h-full w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2"
          }
        >
          Events
        </Link>
      </div>
      {/* small navbar */}
      <div className="md:hidden z-10 h-12 rounded-lg w-full bg-white flex justify-center items-center">
        <a href="/">
          <img className="h-10 w-auto pl-5" src={logo} alt="ikan" />
        </a>
        <img
          className="h-7 absolute right-8 w-auto"
          src={!open ? menu : close}
          onClick={() => setOpen(!open)}
          alt="menu"
        />
      </div>

      {/* small navbar menu */}
      {open ? (
        <div className="z-30 md:hidden h-full w-screen bg-white  -ml-4 top-0 fixed">
          <img
            className="h-7 absolute top-6 right-8 w-auto"
            src={close}
            onClick={() => setOpen(!open)}
            alt="menu"
          />
          <div className=" h-full text-2xl flex flex-col left-12 justify-center gap-4 fixed">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/events">Events</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
