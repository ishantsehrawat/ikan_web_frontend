import React from "react";

import { Navbar, Footer } from "../components";

export default function NotFound() {
  return (
    <div className="bg-cgrey pt-30">
      <div className="mt-30 bg-notfound bg-center bg-cover bg-no-repeat bg-origin-padding hover:bg-opacity-75">
        <div className="p-10 h-screen ">
          <Navbar />
          <div className="flex w-full h-full items-center justify-center">
            <a
              href="/"
              className="h-16 mt-5 mr-12 w-52 bg-black text-white text-xl rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:scale-125 hover:bg-white hover:text-black hover:b-2"
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
