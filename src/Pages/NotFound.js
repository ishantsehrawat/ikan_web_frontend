import React from "react";

import { Navbar, Footer } from "../components";

export default function NotFound() {
  return (
    <div className="bg-cgrey">
      <div className="bg-notfound bg-center bg-cover bg-no-repeat">
        <div className="p-4 md:p-10 h-screen ">
          <Navbar />
          <div className="flex w-full h-full items-center justify-around">
            <a
              href="/"
              className="h-16 w-52 bg-black text-white text-xl rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:scale-125 hover:bg-white hover:text-black hover:b-2"
            >
              Go Back
            </a>
          </div>
        </div>
      </div>
      <Footer Page="notfound" />
    </div>
  );
}
