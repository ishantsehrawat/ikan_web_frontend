import React from "react";
import { Navbar, Footer } from "../components";
import { event1 } from "../images";
import { arrowup } from "../images/icons";

function EventDetail() {
  
  const apply=()=>{
    window.alert("Applied");
  }

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventDetail h-1/2 w-full p-10">
        <Navbar Page="event-detail" />
        <div className="mt-28 text-white ml-5">
          <h1 className="text-4xl font-bold mb-3">Event Details</h1>
          <p>
          Welcome to the event details page. Here you will find all the information you need to know about a specific event, including date, time, location, and event description.
          </p>
        </div>
      </div>
      <div className="h-[50vh] w-full flex justify-center items-center">
        <div className="flex h-72 w-[1100px] justify-center">
          <div className="flex">
            {/* <div className="flex flex-col justify-between">
              <img className="h-1/3 p-1 " src={event1} alt="event" />
              <img className="h-1/3 p-1 " src={event1} alt="event" />
              <img className="h-1/3 p-1 " src={event1} alt="event" />
            </div> */}
            <img className="p-1" src={event1} alt="event" />
          </div>
          <div className="flex flex-col w-[500px] justify-between ml-5 my-5">
            <div>
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  Food Distribution: Zero Hunger
                </h2>
                <p className="text-gray-500">New Delhi, Delhi</p>
              </div>
              <h4 className="text-sm text-gray-700">ishant@ikan.com</h4>
            </div>
            <div className="">
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </p>
              <p className="text-gray-500 mt-3">2023-02-04</p>
            </div>
            <div className="text-sm">
              <p>
                Categories:{" "}
                <span className="text-gray-500">
                  Donation, Food, Non-profit
                </span>
              </p>
              <p>
                Contact: <span className="text-gray-500">+91 12345 67890</span>
              </p>
              <p>
                Share:{" "}
                <span className="text-gray-500">@project_zero_hunger</span>
              </p>
            </div>
            <button
              onClick={apply}
              className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="h-[50vh] -mb-20 w-full bg-lightsaffron flex justify-center items-center">
        <div className="h-[40vh] w-[1100px] flex justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="underline font-bold">Description</h2>
            <div>
              <h3 className="font-bold mb-2">Varius tempor.</h3>
              <p className="text-sm">
                Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor
                ornare faucibus vel sed et eleifend habitasse amet. Montes,
                mauris varius ac est bibendum. Scelerisque a, risus ac ante.
                Velit consectetur neque, elit, aliquet. Non varius proin sed
                urna, egestas consequat laoreet diam tincidunt. Magna eget
                faucibus cras justo, tortor sed donec tempus. Imperdiet
                consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in
                fringilla vulputate nunc nec. Dui, massa viverr .
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">More Details</h3>
              <ul type="disc" className="text-sm">
                <li className="pb-2">
                  <img
                    className="h-4 w-4 inline -mt-1 mr-2"
                    src={arrowup}
                    alt="arrow"
                  />
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                  diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                  vulputate nunc nec. Dui, massa viverr .
                </li>
                <li className="pb-2">
                  <img
                    className="h-4 w-4 inline -mt-1 mr-2"
                    src={arrowup}
                    alt="arrow"
                  />
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                  diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                  vulputate nunc nec. Dui, massa viverr .
                </li>
                <li className="pb-2">
                  <img
                    className="h-4 w-4 inline -mt-1 mr-2"
                    src={arrowup}
                    alt="arrow"
                  />
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                  diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                  vulputate nunc nec. Dui, massa viverr .
                </li>
                <li className="pb-2">
                  <img
                    className="h-4 w-4 inline -mt-1 mr-2"
                    src={arrowup}
                    alt="arrow"
                  />
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                  diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                  vulputate nunc nec. Dui, massa viverr .
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetail;
