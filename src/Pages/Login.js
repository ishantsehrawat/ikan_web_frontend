import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  getDocs,
  query,
  collection,
  where,
  setDoc,
  doc,
} from "firebase/firestore";

import { auth, db, provider } from "../firebase-config";
import { logo } from "../images";
import { google } from "../images/icons";
//import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userRef = collection(db, "users");

  const createUser = async (user, authprovider, checked) => {
    await setDoc(doc(userRef, user.email), {
      name: user?.displayName,
      type: checked ? "volunteer" : "organisation",
      phone: user?.phoneNumber,
      photo: user?.photoURL,
      email: user.email,
      uid: user.uid,
      authprovider: authprovider,
    });
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "token",
        JSON.stringify(auth.currentUser.accessToken)
      );
      console.log(auth.currentUser);
      // window.location.reload();
      redirect("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      const res = await getDocs(
        query(collection(db, "users"), where("email", "==", user.user.email))
      );
      localStorage.setItem("token", JSON.stringify(user.user.uid));
      console.log(auth.currentUser);
      if (res.empty) {
        createUser(user.user, user.providerId, true);
      }
      // window.location.reload();
      redirect("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-full w-full ">
      {/* <div className="h-16 p-2"> */}
      <img
        className="absolute h-10 md:h-12 w-auto top-12 left-6 md:left-16"
        src={logo}
        alt="ikan"
      />
      {/* </div> */}

      <div className="flex h-full text-center flex-col-reverse md:flex-row items-center justify-center">
        <div className="md:h-full md:w-full flex flex-col justify-center items-center mt-20 md:mt-0">
          <div className="place-self-center hidden md:block">
            <h1 className="text-5xl font-bold m-8">Welcome Back</h1>
            <p className="mb-32">
              Login to continue your Journey with the<br></br>
              largest community of volunteers.
            </p>
          </div>
          <div>
            <p className="mb-4 font-bold md:font-normal">
              Don't have an account?
            </p>
            <button className="bg-transparent hover:bg-saffron text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>

        <div className="md:w-full flex justify-center">
          <div className="bg-white rounded-2xl w-[330px] md:w-[400px] md:h-[450px] flex flex-col items-center">
            <div className="p-5">
              <h1 className="text-4xl md:text-5xl font-bold ">Login</h1>
            </div>

            <button
              className="w-10 h-10 m-4 rounded-full bg-white outline outline-2 outline-cgrey text-black shadow flex justify-center items-center"
              onClick={signInWithGoogle}
            >
              <img className="h-6 w-6" src={google} alt="google" />
            </button>

            <div className="flex flex-col w-3/4 text-left">
              <div className="mb-4 w-full ">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-2.5 bg-white border border-saffron rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron
                  disabled:bg-white disabled:text-gray-500 disabled:border-saffron disabled:shadow-none
                  invalid:border-saffron invalid:text-gray-500
                  focus:invalid:border-red focus:invalid:ring-red
                  dark:text-gray-700 dark:focus:ring-saffron dark:focus:border-saffron"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full p-2.5 bg-white border border-saffron rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron
                  disabled:bg-white disabled:text-gray-500 disabled:border-saffron disabled:shadow-none
                  invalid:border-saffron invalid:text-saffron
                  focus:invalid:border-red focus:invalid:ring-red
                  dark:text-gray-700 dark:focus:ring-saffron dark:focus:border-saffron"
                  placeholder="•••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pb-10">
              <button
                className="bg-saffron hover:bg-black text-white font-semibold hover:text-white py-2 px-5 rounded mt-5"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
