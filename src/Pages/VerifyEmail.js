import React, { useEffect, useState } from "react";
import { sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";

import { auth } from "../firebase-config";
import { Navbar, Footer } from "../components";

export default function NotFound() {
  // const [user, setuser] = useState({});
  // useEffect(() => {
  //   const res = auth.currentUser;
  // }, [auth, user]);
  const res = auth.currentUser;
  console.log(auth.currentUser);
  // console.log(user);
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
      <div className="bg-verifyEmail bg-center bg-cover bg-no-repeat">
        <div className="p-4 md:p-10 h-screen ">
          <Navbar />
          <div className="flex flex-col w-full h-[80vh] items-center pt-36">
            <p className="pb-10 font-black text-6xl text-center">
              Please verify your <span className="text-saffron">email</span>
            </p>
            <button
              onClick={verify}
              className="h-16 w-52 bg-black text-white text-xl rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:scale-110 hover:bg-white hover:text-black hover:b-2"
            >
              Send Link
            </button>
          </div>
        </div>
      </div>
      <Footer Page="notfound" />
    </div>
  );
}
