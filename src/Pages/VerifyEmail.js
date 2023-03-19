import React from "react";
import { sendEmailVerification } from "firebase/auth";

import { auth } from "../firebase-config";
import { Navbar, Footer } from "../components";

export default function NotFound() {
  const res = auth.currentUser;
  console.log(auth.currentUser);
  const verify = async () => {
    await sendEmailVerification(res)
      .then(() => {
        window.alert("Verification email sent");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="bg-cgrey">
      <div className="p-4 md:p-10 h-screen ">
        <Navbar />
        <div className="flex flex-col w-full h-full items-center justify-center">
          <h1 className="pb-20 text-6xl font-semibold text-center">
            Please Verify Your Email
          </h1>
          <button
            onClick={verify}
            className="h-16 w-52 bg-black text-white text-xl rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:scale-125 hover:bg-white hover:text-black hover:b-2"
          >
            Send link
          </button>
        </div>
      </div>
      <Footer Page="notfound" />
    </div>
  );
}
