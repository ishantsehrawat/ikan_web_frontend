import React from "react";
import { logo } from "../images";

function Login() {
  return (
    <div className="h-full w-full bg-slate-400">
      <div className="h-16 p-2">
        <img className="h-12 w-auto pl-5" src={logo} alt="ikan" />
      </div>
      <div className="flex h-auto text-center">
        <div className="h-full bg-slate-500 w-1/2 py-32 flex flex-col justify-center items-center">
          <div>
            <h1 className="text-5xl font-bold mb-5">Welcome Back</h1>
            <p className="w-4/5 ">
              Login to continue your Journey with the largest community of
              innovators
            </p>
          </div>
          <div>
            <p>Don't have an account?</p>
            <button>Register</button>
          </div>
        </div>
        <div className="w-1/2 bg-slate-600">
          <div className="bg-white rounded-xl h-auto m-16">
            <h1 className="text-5xl font-bold">Login</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
