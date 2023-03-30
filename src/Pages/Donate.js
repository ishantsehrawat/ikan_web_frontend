import React from "react";
import { Navbar, Footer } from "../components";
import { donategraphic } from "../images";

function Donate() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-donateHeader h-1/2 w-full p-4 md:p-10">
        <Navbar Page="event-detail" />
        <div className="text-white mt-28 ml-5">
          <h1 className="text-4xl font-bold mb-3">Support</h1>
          <p>
            Your support will make a difference in the lives of those we serve
            and help us continue our mission of making a positive impact in the
            community
          </p>
        </div>
      </div>
      <div className="h-[50vh] w-full flex justify-center items-center">
        <div className="flex h-72 w-[1100px] justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-between">
              <div>
                <div className=" px-4 flex justify-between text-3xl md:text-6xl font-light">
                  <h2 className="md:leading-[70px]">
                    “As we work to create
                    <span className=" text-saffron"> light </span>
                    for others, we naturally
                    <span className=" text-saffron"> light </span> our own way.”
                  </h2>
                </div>
              </div>
            </div>
            <img className="p-1" src={donategraphic} alt="event" />
          </div>
        </div>
      </div>
      <div className="h-[50vh] w-full bg-cgray flex justify-center items-center text-center">
        <div className="bg-white rounded-2xl w-[330px] md:w-[1100px] md:h-[450px] flex flex-col items-center">
          <div className="pt-5">
            <h1 className="text-xl md:text-3xl font-bold ">
              Be the reason{" "}
              <span className="text-xl md:text-3xl font-bold text-saffron">
                someone smiles
              </span>{" "}
              today!
            </h1>
          </div>
          <a
            className="bg-saffron hover:bg-black text-white font-semibold hover:text-white py-2 px-5 rounded my-5 transition duration-500 hover:scale-105"
            href="https://donate.stripe.com/test_00g3cD9Zoc9Se1qdQT"
          >
            Donate Now
          </a>
          <h1 className="text-xl md:text-3xl font-bold ">
            Why choose{" "}
            <span className="text-xl md:text-3xl font-bold text-saffron">
              Us
            </span>{" "}
            ?
          </h1>
          <div className="pt-16 md:px-4">
            <div className="flex flex-col md:flex-row gap-8 text-center ">
              <div className="w-full md:w-1/3 md:px-3">
                <h1 className="text-saffron font-bold text-xl md:text-3xl mb-2 hover:text-black transition duration-500 hover:scale-105">
                  Credibility
                </h1>
                <p className="hidden md:block text-base md:text-lg">
                  Ikan ensures that all volunteer organizations listed on the
                  platform are credible .
                </p>
              </div>
              <div className="w-full md:w-1/3 md:px-3">
                <h1 className="text-saffron font-bold text-xl md:text-3xl mb-2 hover:text-black transition duration-500 hover:scale-105">
                  Transparency
                </h1>
                <p className="hidden md:block text-base md:text-lg">
                  Ikan provides detailed information about the organizations and
                  their events.
                </p>
              </div>
              <div className="w-full md:w-1/3 md:px-3">
                <h1 className="text-saffron font-bold text-xl md:text-3xl mb-2 hover:text-black transition duration-500 hover:scale-105">
                  Impact
                </h1>
                <p className="hidden md:block text-base md:text-lg">
                  Ikan helps small-scale volunteer organizations in increasing
                  their impact in their communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
