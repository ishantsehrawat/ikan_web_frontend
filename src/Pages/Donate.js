import React from "react";
import { Navbar } from "../components";
import { donategraphic } from "../images";

function Donate() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-lightsaffron h-1/2 w-full p-10">
        <Navbar Page="event-detail" />
        <div className="mt-28 ml-5">
          <h1 className="text-4xl font-bold mb-3">Support</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in
            est adipiscing in phasellus non in justo.
          </p>
        </div>
      </div>
      <div className="h-[50vh] w-full flex justify-center items-center">
        <div className="flex h-72 w-[1100px] justify-center">
          <div className="flex">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <h2 className="text-6xl font-extralight leading-[70px] font-semibold">
                  “As we work to create 
                  <span className="text-6xl font-light font-semibold font text-saffron"> light </span> 
                  for others, we naturally 
                  <span className="text-6xl font-light font-semibold font text-saffron"> light </span> our own way.”
                </h2>
              </div>
            </div>
          </div>
            <img className="p-1" src={donategraphic} alt="event" />
          </div>

        </div>
      </div>
      <div className="h-[50vh] w-full bg-cgray flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[330px] md:w-[900px] md:h-[450px] flex flex-col items-center">
            <div className="p-5">
              <h1 className="text-4xl md:text-3xl font-bold ">Be the reason <span className="text-4xl md:text-3xl font-bold text-saffron">someone smiles</span> today!</h1>
            </div>
            <a
                className="bg-saffron hover:bg-black text-white font-semibold hover:text-white py-2 px-5 rounded my-5"
                href = "https://donate.stripe.com/test_00g3cD9Zoc9Se1qdQT"
              >
                Donate Now
            </a>
            <div className="p-5">
              <h1 className="text-4xl md:text-3xl font-bold ">Why choose <span className="text-4xl md:text-3xl font-bold text-saffron">Us</span> ?</h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
