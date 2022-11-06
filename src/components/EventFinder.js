import React, { useState } from "react";
import dayjs from "dayjs";

import { Location, Date, EventOverlay, OverlayBackground } from "../components";
import { search } from "../images/icons";

let date = dayjs().date();
let month = dayjs().month() + 1;
let year = dayjs().year();
const separator = " - ";

const today = `${date}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${year}`;

function EventFinder({ Page }) {
  const [uLocation, setuLocation] = useState(false);
  const [locationName, setLocationName] = useState("New Delhi, Delhi, India");
  const [uDate, setuDate] = useState(false);
  const [eventdate, setDate] = useState(today);
  const [uEvent, setuEvent] = useState(false);
  const [eventType, setEventType] = useState([
    {
      id: 1,
      type: "Food Distribution",
      isChecked: true,
    },
    {
      id: 2,
      type: "Plantation",
      isChecked: false,
    },
    {
      id: 3,
      type: "Education",
      isCheched: false,
    },
    {
      id: 4,
      type: "Health",
      isCheched: false,
    },
    {
      id: 5,
      type: "Animal Welfare",
      isCheched: false,
    },
    {
      id: 6,
      type: "Cleanliness",
      isCheched: false,
    },
    {
      id: 7,
      type: "Cloth Distribution",
      isCheched: false,
    },
  ]);

  console.log(eventdate);
  // console.log(uDate);
  // console.log(locationName);
  return (
    <div className={Page === "home" ? "-mt-7 z-10" : "-mt-6 z-10 mx-10"}>
      <div className="px-10 w-auto h-28 bg-white rounded-lg flex justify-between items-center font-bold">
        <button
          className="bg-gray w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuLocation(true)}
        >
          <p>Location</p>
          <p className="font-normal tracking-widest">{locationName}</p>
        </button>
        <button
          className="bg-gray w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuDate(true)}
        >
          <p>Date</p>
          <p className="font-normal tracking-widest">{eventdate}</p>
        </button>
        <button
          className="bg-gray w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuEvent(true)}
        >
          <p>Type</p>
          <p className="font-normal tracking-widest">Food Distribution</p>
        </button>
        <a
          className="bg-saffron w-48 h-16 rounded-lg text-white flex justify-center items-center font-normal"
          href="/events"
        >
          <img src={search} alt="search" className="pr-3" /> Search
        </a>
      </div>

      {/* Location Overlay */}
      <div>
        <button
          className={
            uLocation
              ? "absolute z-10 top-0 left-0 w-screen h-screen bg-black opacity-20 "
              : "hidden"
          }
          onClick={() => setuLocation(false)}
        ></button>
        <Location
          uLocation={uLocation}
          setLocationName={setLocationName}
          setuLocation={setuLocation}
        />
      </div>

      {/* Date Overlay */}
      <div>
        <OverlayBackground Overlay={uDate} setBackButton={setuDate} />
        <Date uDate={uDate} setDate={setDate} setuDate={setuDate} />
      </div>

      {/* Event Overlay */}
      <div>
        <button
          className={
            uEvent
              ? "w-screen h-screen bg-black opacity-20 absolute z-10 top-0 left-0"
              : "hidden"
          }
          onClick={() => setuEvent(false)}
        ></button>
        <EventOverlay
          uEvent={uEvent}
          eventType={eventType}
          setuEvent={setuEvent}
          setEventType={setEventType}
        />
      </div>
    </div>
  );
}

export default EventFinder;
