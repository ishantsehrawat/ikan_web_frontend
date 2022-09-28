import React from "react";

import { Navbar } from "../components";
import { globe } from "../images";
import { arrow } from "../images/icons";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-between h-auto w-auto px-16">
        <div className="h-auto pt-12 pb-8  flex flex-col justify-between items-start">
          <h1 className="text-6xl">
            All Your
            <br />
            <span className="text-saffron font-semibold">
              Volunteer
              <br /> Needs
            </span>
            <br />
            Are Here
          </h1>
          <p className="tracking-widest -mt-5">
            This Platform website is for the platform of platforming
            <br />
            the major Platformers Platforming
          </p>
          <div className="w-80 flex items-center justify-between">
            <button className="h-12 w-48 bg-saffron text-white rounded-md">
              Explore Now
            </button>
            <button className="h-16 w-16 flex justify-center items-center bg-white rounded-full border-4 border-saffron">
              <img className="h-5 w-9 pl-1" src={arrow} alt="arrow" />
            </button>
          </div>
        </div>
        <img
          className="h-[600px] w-[600px] -mt-28"
          src={globe}
          alt="helping hands"
        />
      </div>
      <div className="w-auto h-28 bg-white rounded-lg "></div>
    </div>
  );
}

export default Home;
