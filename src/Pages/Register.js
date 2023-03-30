import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db, provider } from "../firebase-config";

import { logo } from "../images";
import { google } from "../images/icons";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const userRef = collection(db, "users");

  const createUser = async (user, authprovider) => {
    await setDoc(doc(userRef, user?.email), {
      name: user?.displayName,
      type: "volunteer",
      phone: user?.phoneNumber,
      photo: user?.photoURL,
      email: user.email,
      uid: user.uid,
      authprovider: authprovider,
    });
  };

  const userRegistration = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = res.user;
      await sendEmailVerification(res.user)
        .then(() => {
          window.alert("Verification email sent");
        })
        .catch((err) => {
          console.log(err.message);
        });
      localStorage.setItem("token", JSON.stringify(user.uid));
      createUser(user, "local").then(() => {
        window.alert("user created successfully");
        window.location.href = "/";
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInWithGoogle = async () => {
    signInWithRedirect(auth, provider);
  };

  const getUser = async (registerEmail) => {
    const res = await getDocs(
      query(collection(db, "users"), where("email", "==", registerEmail))
    );
    return res;
  };

  getRedirectResult(auth)
    .then(async (result) => {
      const user = result.user;
      getUser(user?.email).then((res) => {
        console.log("res" + res.empty);
        if (res.empty) {
          console.log("res empty");
          createUser(user, user.providerId).then(() => {
            window.alert("user created successfully");
          });
        }
      });
      localStorage.setItem("token", JSON.stringify(user?.uid));
    })
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {});

  return (
    <div className="h-full w-full ">
      {/* <div className="h-16 p-2"> */}
      <img
        className="absolute h-10 md:h-12 w-auto top-12 left-6 md:left-16"
        src={logo}
        alt="ikan"
      />
      {/* </div> */}

      <div className="flex h-full text-center flex-col md:flex-row items-center justify-center">
        <div className="md:w-full flex justify-center">
          <div className="bg-white rounded-2xl w-[330px] md:w-[400px] md:h-[450px] flex flex-col items-center">
            <div className="p-5">
              <h1 className="text-4xl md:text-5xl font-bold ">Register</h1>
            </div>

            {/* <div className="flex flex-row">
              <span className="mx-7 text-sm font-medium text-gray-900 dark:text-gray-500 whitespace-normal">
                Volunteer
              </span>

              <label
                htmlFor="orange-toggle"
                className="inline-flex relative items-center mr-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  id="orange-toggle"
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-saffron peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-saffron "></div>
                <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-500">
                  Organisation
                </span>
              </label>
            </div> */}

            <button
              className="w-10 h-10 m-4 rounded-full bg-white outline outline-2 outline-cgrey text-black shadow flex justify-center items-center"
              onClick={signInWithGoogle}
            >
              <img className="h-6 w-6" src={google} alt="google" />
            </button>

            <div className="flex flex-col w-3/4">
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
                  disabled:bg-white disabled:text-gray-300 disabled:border-saffron disabled:shadow-none
                  invalid:border-saffron invalid:text-gray-500
                  focus:invalid:border-red focus:invalid:ring-red
                  dark:text-black dark:focus:ring-saffron dark:focus:border-saffron"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
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
                  disabled:bg-white disabled:text-gray-300 disabled:border-saffron disabled:shadow-none
                  invalid:border-saffron invalid:text-gray-500
                  focus:invalid:border-red focus:invalid:ring-red
                  dark:text-black dark:focus:ring-saffron dark:focus:border-saffron"
                  placeholder="•••••••••"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pb-5">
              <button
                className="bg-saffron hover:bg-black text-white font-semibold hover:text-white py-2 px-5 rounded"
                onClick={userRegistration}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="md:h-full md:w-full flex flex-col justify-center items-center mt-20 md:mt-0">
          <div className="place-self-center hidden md:block">
            <h1 className="text-5xl font-bold m-4">Hello, there</h1>
            <p className="mb-16">
              Join the largest<br></br>
              community of volunteers.
            </p>
          </div>
          <div>
            <p className="mb-4 font-bold md:font-normal">
              Already have an account?
            </p>
            <button className="bg-transparent hover:bg-saffron text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
              <a href="/">Login</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
