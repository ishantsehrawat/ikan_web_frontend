import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom"

import { Location, Date, EventOverlay, OverlayBackground } from "../components";
import {db} from "../firebase-config"
import {eventObject} from "../Data/Location/events"
import { search } from "../images/icons";

let date = dayjs().date();
let month = dayjs().month() + 1;
let year = dayjs().year();
const separator = "-";

const today = `${year}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${date}`;

function EventFinder({ Page,SearchParamsSet }) {
  const navigate = useNavigate();
  const { loc, date, events } = useParams();
  const [uLocation, setuLocation] = useState(false);
  const [locationName, setLocationName] = useState("New Delhi, Delhi, India");
  const [uDate, setuDate] = useState(false);
  const [eventdate, setDate] = useState(today);
  const [uEvent, setuEvent] = useState(false);
  const [check, setcheck] = useState([false,false,false,false,false,false,false]);
  const [ev, setev] = useState(0);
  const [eventArray, setEventArray] = useState([]);
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
      isChecked: true,
    },
    {
      id: 4,
      type: "Health",
      isChecked: false,
    },
    {
      id: 5,
      type: "Animal Welfare",
      isChecked: false,
    },
    {
      id: 6,
      type: "Cleanliness",
      isChecked: false,
    },
    {
      id: 7,
      type: "Cloth Distribution",
      isChecked: false,
    },
  ]);
  const searchEvent = () => {
    navigate(`/events/${locationName}/${eventdate}/${ev}`)
    SearchParamsSet()
  }

useEffect(()=>{
  const handleAddEvents = (number) => {
    if (!number) {
        console.error("No number found in the URL");
        return;
    }
    let eventIds = number.toString().split("")
    if(!(eventIds[0] === '0')){
      setEventArray(eventIds)
    }
    
  };
  if(events){
    handleAddEvents(events)
  }
},[events])
  

  useEffect(() => {
    if(date){
      setDate(date)
    }
    if(loc){
      setLocationName(loc);
    }
  },[date, loc]);


  return (
    <div className={Page === "home" ? " z-20 drop-shadow-lg backdrop-blur-lg mt-10" : " z-20 -mt-10 mx-10 h-full drop-shadow-lg backdrop-blur-lg"}>
      <div className="px-10 w-auto py-2 md:py-0 md:h-28 bg-white rounded-lg flex flex-wrap justify-between items-center font-bold text-xs md:text-base text-left">
        <div className="flex justify-between w-full md:w-1/2">
        <button
          className="bg-gray w-1/2 md:w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuLocation(true)}
        >
          <p>Location</p>
          <p className="font-normal text-left w-full tracking-widest text-truncate overflow-hidden whitespace-nowrap">{locationName}</p>
        </button>
        <button
          className="bg-gray w-1/2 md:w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuDate(true)}
        >
          <p>Date</p>
          <p className="font-normal text-left w-full tracking-widest text-truncate overflow-hidden whitespace-nowrap">{eventdate}</p>
        </button>
        </div>
        <button
          className="bg-gray w-full mb-4 md:mb-0 md:w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuEvent(true)}
        >
          <p>Type</p>
          <p className="font-normal w-full tracking-widest text-left text-truncate overflow-hidden whitespace-nowrap" >
          {eventArray.length === 0 ? eventType
            .filter((et) => check[et.id-1] === true)
            .map((et) => (
              et.type+", "
            )) : 
              eventArray?.map((et)=> eventObject[et-1].type+", ")
            }
          </p>
        </button>
        <button
          className="bg-saffron w-full md:w-48 h-8 md:h-16 rounded-lg text-white flex justify-center items-center font-normal"
          onClick={searchEvent}
        >
          <img src={search} alt="search" className="pr-3" /> Search
        </button>
      </div>

      {/* Location Overlay */}
      <div className="h-full">
        <OverlayBackground Overlay={uLocation} setBackButton={setuLocation} />
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
        <OverlayBackground Overlay={uEvent} setBackButton={setuEvent} />
        <EventOverlay
          uEvent={uEvent}
          eventType={eventType}
          setuEvent={setuEvent}
          setEventType={setEventType}
          setcheck={setcheck}
          check={check}
          setev={setev}
        />
      </div>
    </div>
  );
}

export default EventFinder;
