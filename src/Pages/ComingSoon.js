import React from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

import { Navbar, Footer } from "../components";

export default function NotFound() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-cgrey">
      <div className="p-4 md:p-10 h-screen ">
        <Navbar />
        <div className="flex flex-col w-full h-full items-center justify-center">
          <h1 className="pb-20 text-6xl font-semibold text-center">
            Coming Soon <br /> ishhh
          </h1>
          <button
            onClick={logout}
            className="h-16 w-52 bg-black text-white text-xl rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:scale-125 hover:bg-white hover:text-black hover:b-2"
          >
            Log Out
          </button>
        </div>
      </div>
      <Footer Page="notfound" />
    </div>
  );
}
