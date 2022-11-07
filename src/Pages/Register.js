import React from "react";
import { logo } from "../images";
import { google } from "../images/icons";
//import GoogleIcon from '@mui/icons-material/Google';

function Register() {
  return (

    <div className="h-full w-full ">

      <div className="h-16 p-2">
        <img className="h-12 w-auto pl-5" src={logo} alt="ikan" />
      </div>

      <div className="flex h-auto text-center">

      <div className="flex-1">
          <div className="bg-white w-full rounded-xl m-16 flex flex-col items-center ">

            <div className="p-5">
              <h1 className="text-5xl font-bold ">Register</h1>
            </div>

            <div className="flex flex-row">
              <span class="mx-7 text-sm font-medium text-gray-900 dark:text-gray-500 whitespace-normal">Volunteer</span>
            
              <label for="orange-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                <input type="checkbox" value="" id="orange-toggle" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-saffron peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-saffron "></div>
                <span class="ml-4 text-sm font-medium text-gray-900 dark:text-gray-500">Organisation</span>
              </label>
            </div>

            <button className="w-10 h-10 m-4 rounded-full bg-white outline outline-2 outline-cgrey text-black shadow flex justify-center items-center">
              <img className="h-6 w-6" src={google} alt="google"/>
            </button>

            <div className="flex flex-col w-3/4">
              <div class="mb-4 w-full ">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Email address</label>
                <input type="email" id="email" class="mt-1 block w-full p-2.5 bg-white border border-saffron rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron
                  disabled:bg-white disabled:text-gray-300 disabled:border-saffron disabled:shadow-none
                  invalid:border-saffron invalid:text-gray-500
                  focus:invalid:border-red focus:invalid:ring-red
                  dark:text-black dark:focus:ring-saffron dark:focus:border-saffron" 
                  placeholder="johndoe@gmail.com" required/>
                </div>
              <div class="mb-4">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Password</label>
                <input type="password" id="password" class="mt-1 block w-full p-2.5 bg-white border border-saffron rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron
                  disabled:bg-white disabled:text-gray-300 disabled:border-saffron disabled:shadow-none
                  invalid:border-saffron invalid:text-gray-500
                  focus:invalid:border-red focus:invalid:ring-red
                  dark:text-black dark:focus:ring-saffron dark:focus:border-saffron" placeholder="•••••••••" required/>
              </div> 
            </div>

            <div className="pb-5">
              <button className="bg-saffron hover:bg-black text-white font-semibold hover:text-white py-2 px-5 rounded">Submit</button>
            </div>
          </div>
        </div>

        <div className="h-full w-1/2 p-32 flex flex-col justify-center items-center">
          <div className="place-self-center">
            <h1 className="text-5xl font-bold m-4">Hello, there</h1>
            <p className="mb-16">
              Join the largest<br></br> 
              community of volunteers.
            </p>
          </div>
          <div>
            <p className="mb-4">Already have an account?</p>
            <button className="bg-transparent hover:bg-saffron text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Login</button>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Register;
