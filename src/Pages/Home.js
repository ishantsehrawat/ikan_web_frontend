import React from "react";

import { Navbar, EventFinder, Footer } from "../components";
import { globe } from "../images";
import { arrow } from "../images/icons";

function Home() {
  return (
    <div>
    <div className="p-4 md:p-10">
      <Navbar Page={"home"} />
      <div className="flex flex-col md:flex-row justify-between h-auto w-auto px-4 md:px-16">
        <div className="h-auto pt-4 md:pt-12 pb-8  flex flex-col justify-between items-start">
          <h1 className="text-5xl md:text-6xl">
            All Your
            <br />
            <span className="text-saffron font-semibold">
              Volunteer
              <br /> Needs
            </span>
            <br />
            Are Here
          </h1>
          <p className="tracking-widest mt-3">
            This Platform website is for the platform of platforming
            <br />
            the major Platformers Platforming
          </p>
          <div className="w-full md:w-80 mt-4 md:-mt-8 flex items-center justify-between">
            <a
              className="h-12 w-full md:w-48 bg-saffron text-white rounded-md flex justify-center items-center"
              href="/events"
            >
              Explore Now
            </a>
            <button className="hidden">
              <img className="h-40 w-40" src={arrow} alt="arrow" />
            </button>
          </div>
        </div>
        <img
          className="md:h-[500px] w-10/11 md:w-[550px] -mt-8 md:-mt-4"
          src={globe}
          alt="helping hands"
        />
      </div>
      <EventFinder Page={"home"} />
    </div>
      <Footer />
    </div>
  );
}

export default Home;
