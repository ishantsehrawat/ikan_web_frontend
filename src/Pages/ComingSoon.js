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
      <div className="bg-comingSoon bg-center bg-cover bg-no-repeat">
        <div className="p-4 md:p-10 h-screen ">
          <Navbar />
          <div className="flex flex-col w-full h-[80vh] items-center pt-36">
            <p className="pb-10 font-black text-6xl text-center">
              We're under <span className="text-saffron">Maintainence</span>
            </p>
            <button
              onClick={logout}
              className="h-16 w-52 bg-black text-white text-xl rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:scale-110 hover:bg-white hover:text-black hover:b-2"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Footer Page="notfound" />
    </div>
  );
}
