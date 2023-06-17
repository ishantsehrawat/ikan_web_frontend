import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Tooltip, Zoom } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { useParams } from "react-router-dom";

import { search } from "../images/icons";
import { Modal } from "../components";
import { country, state, city } from "../Data/Location";
import { eventObject } from "../Data/events";

// today's date
let date = dayjs().date();
let month = dayjs().month() + 1;
let year = dayjs().year();
const separator = "-";

const today = `${year}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${date}`;

// scale object
const scaleObject = ["Micro", "Small", "Medium", "Large", "Mega"];

function EventSearch({ page, searchParameters }) {
  const [cityName, setcityname] = useState("New Delhi");
  const [stateName, setstatename] = useState("Delhi");
  const [countryName, setcountryname] = useState("India");
  const [date, setdate] = useState(today);
  const [name, setname] = useState("");
  const [scale, setscale] = useState([]);
  // eslint-disable-next-line
  const [type, settype] = useState(0);
  const [eventIDArray, seteventIDArray] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params.city) {
      setcityname(params.city);
    }
    if (params.state) {
      setstatename(params.state);
    }
    if (params.country) {
      setcountryname(params.country);
    }
    if (params.date) {
      setdate(params.date);
    }
    if (params.eventTypeID) {
      seteventIDArray(params.eventTypeID.split(","));
    }
    if (params.name) {
      setname(params.name);
    }
    if (params.scale) {
      setscale(params.scale.split(","));
    }
  }, [params]);

  //   modal open state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [scaleModalOpen, setScaleModalOpen] = useState(false);

  //   for location modal
  const [countryid, setcountryid] = useState("101");
  const [stateid, setstateid] = useState("10");
  // getting state and city based on country
  const st = state.filter((st) => st.country_id === countryid);
  const ct = city.filter((ct) => ct.state_id === stateid);

  //   for type modal
  // update event type
  const updateArray = (id) => {
    var eventIDArrayTemp = eventIDArray;
    if (eventIDArray.includes(id.toString())) {
      var index = eventIDArray.indexOf(id.toString());
      if (index > -1) {
        eventIDArrayTemp.splice(index, 1);
      }
    } else {
      eventIDArrayTemp.push(id.toString());
    }
    seteventIDArray(eventIDArrayTemp);
  };
  const eventIDArrayAll = ["1", "2", "3", "4", "5", "6", "7"];

  //   for scale modal
  const updateScaleArray = (id) => {
    var scaleTemp = scale;
    if (scale.includes(id)) {
      var index = scale.indexOf(id);
      if (index > -1) {
        scaleTemp.splice(index, 1);
      }
    } else {
      scaleTemp.push(id);
    }
    setscale(scaleTemp);
  };

  //   for search button
  var searchLink = "";
  if (page === "events" || page === "home") {
    if (eventIDArray.length > 0) {
      searchLink = `/events/${cityName}/${stateName}/${countryName}/${date}/${eventIDArray}`;
    } else {
      searchLink = `/events/${cityName}/${stateName}/${countryName}/${date}/${eventIDArrayAll}`;
    }
  } else if (page === "organisations") {
    if (scale.length > 0) {
      searchLink = `/Organisations/${cityName}/${stateName}/${countryName}/${name}/${scale}`;
    } else {
      searchLink = `/Organisations/${cityName}/${stateName}/${countryName}/${name}/${scaleObject}`;
    }
  }

  return (
    <div
      className={
        page === "events"
          ? "bg-white w-full md:h-28 rounded-lg -mt-10 mr-10 drop-shadow-lg flex flex-col md:flex-row justify-evenly md:items-center text-left"
          : "bg-white w-full md:h-28 rounded-lg mt-10 drop-shadow-lg flex flex-col md:flex-row justify-evenly md:items-center text-left"
      }
    >
      {/* Location */}
      {searchParameters.includes("location") && (
        <Tooltip
          title={cityName + ", " + stateName + ", " + countryName}
          placement="top"
          arrow
          TransitionComponent={Zoom}
        >
          <button
            className="md:h-20 md:w-[20vw] mx-2 my-1 md:my-2 md:mx-2 p-1 md:p-3 flex flex-col items-start justify-evenly rounded-md hover:bg-slate-100 whitespace-nowrap overflow-hidden"
            onClick={() => setLocationModalOpen(true)}
          >
            <p className="font-semibold text-base">Location</p>
            <p>{cityName + ", " + stateName + ", " + countryName}</p>
          </button>
        </Tooltip>
      )}

      {/* Date */}
      {searchParameters.includes("date") && (
        <button
          className="md:h-20 md:w-[20vw] m-2 p-1 md:p-3 flex flex-col items-start justify-evenly rounded-md hover:bg-slate-100 whitespace-nowrap overflow-hidden"
          onClick={() => setDateModalOpen(true)}
        >
          <p className="font-semibold text-base">Date</p>
          <p>{date}</p>
        </button>
      )}

      {/* Type */}
      {searchParameters.includes("type") && (
        <Tooltip
          title={eventIDArray?.map((id) => {
            return eventObject[id - 1]?.type + ", ";
          })}
          placement="top"
          arrow
          TransitionComponent={Zoom}
          disableHoverListener={eventIDArray.length === 0}
        >
          <button
            id="typeOfEvent"
            className="md:h-20 md:w-[20vw] m-2 p-1 md:p-3 flex flex-col items-start justify-evenly rounded-md hover:bg-slate-100 whitespace-nowrap overflow-hidden"
            onClick={() => {
              settype(0);
              seteventIDArray([]);
              setTypeModalOpen(true);
            }}
          >
            <p className="font-semibold text-base">Type</p>
            <p>
              {eventIDArray?.map((id) => {
                return eventObject[id - 1]?.type + ", ";
              })}
            </p>
          </button>
        </Tooltip>
      )}

      {/* Name */}
      {searchParameters.includes("name") && (
        <Tooltip
          title={name}
          placement="top"
          arrow
          TransitionComponent={Zoom}
          disableHoverListener={name === ""}
        >
          <button
            className="md:h-20 md:w-[20vw] m-2 p-1 md:p-3 flex flex-col items-start justify-evenly rounded-md hover:bg-slate-100 whitespace-nowrap overflow-hidden"
            onClick={() => setNameModalOpen(true)}
          >
            <p className="font-semibold text-base">Name</p>
            <p>{name}</p>
          </button>
        </Tooltip>
      )}

      {/* Scale */}
      {searchParameters.includes("scale") && (
        <Tooltip
          title={scale?.map((id) => {
            return id + ", ";
          })}
          placement="top"
          arrow
          TransitionComponent={Zoom}
          disableHoverListener={scale === ""}
        >
          <button
            className="md:h-20 md:w-[20vw] m-2 p-1 md:p-3 flex flex-col items-start justify-evenly rounded-md hover:bg-slate-100 whitespace-nowrap overflow-hidden"
            onClick={() => {
              setScaleModalOpen(true);
              setscale([]);
            }}
          >
            <p className="font-semibold text-base">Scale</p>
            <p>
              {scale?.map((id) => {
                return id + ", ";
              })}
            </p>
          </button>
        </Tooltip>
      )}

      {/* Submit */}
      <a
        className="h-10 md:h-16 m-4 md:w-[15vw] bg-saffron rounded-md flex justify-center items-center text-white font-semibold text-lg"
        href={searchLink}
      >
        <img src={search} alt="search" className="h-6 w-6 mr-2" />
        Search
      </a>

      {/* Location Modal */}
      <Modal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <label key="country" className="flex flex-col">
            <p className="font-bold">Country</p>
            <select
              name="country"
              className=""
              onChange={(e) => {
                setcountryid(e.target.value);
                setcountryname(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option value="">India</option>
              {country.map((getcon, index) => (
                <option key={index} value={getcon.country_id}>
                  {getcon.country_name}{" "}
                </option>
              ))}
            </select>
          </label>
          <label key="state" className="flex flex-col">
            <p className="font-bold">State</p>
            <select
              className=""
              name="state"
              onChange={(e) => {
                setstateid(e.target.value);
                setstatename(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option value="">Delhi</option>
              {st.map((getst, index) => (
                <option key={index} value={getst.state_id}>
                  {getst.state_name}{" "}
                </option>
              ))}
            </select>
          </label>
          <label key="city" className="flex flex-col">
            <p className="font-bold">City</p>
            <select
              className=""
              name="city"
              onChange={(e) => {
                setcityname(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option value="">New Delhi</option>
              {ct.map((gcity, index) => (
                <option key={index} value={gcity.city_id}>
                  {" "}
                  {gcity.city_name}{" "}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Modal>

      {/* Date Modal */}
      <Modal
        open={dateModalOpen}
        modalName={"date"}
        onClose={() => setDateModalOpen(false)}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker
            minDate={dayjs()}
            onChange={(newDate) => {
              const formatteddate = dayjs(newDate).format("YYYY-MM-DD");
              setdate(formatteddate);
              setDateModalOpen(false);
            }}
          />
        </LocalizationProvider>
      </Modal>

      {/* Type Modal */}
      <Modal open={typeModalOpen} onClose={() => setTypeModalOpen(false)}>
        <div className="flex flex-col items-left gap-2 mt-2 mx-10">
          {eventObject.map((et) => (
            <label key={et.id} className="flex items-left">
              <input
                type="checkbox"
                className="mr-2"
                name={et.type}
                value={et.id}
                onChange={(e) => updateArray(et.id)}
              />
              {et.type}
            </label>
          ))}
        </div>
      </Modal>

      {/* Name Modal */}
      <Modal open={nameModalOpen} onClose={() => setNameModalOpen(false)}>
        <div className="flex flex-col items-left gap-2 mt-2 mx-10">
          <label className="flex flex-col gap-2 items-left">
            <p className="font-bold">Name</p>
            <input
              type="text"
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </label>
        </div>
      </Modal>

      {/* Scale Modal */}
      <Modal open={scaleModalOpen} onClose={() => setScaleModalOpen(false)}>
        <div className="flex flex-col items-left gap-2 mt-2 mx-10">
          {scaleObject.map((et) => (
            <label key={et.id} className="flex items-left">
              <input
                type="checkbox"
                className="mr-2"
                name={et}
                value={et}
                onChange={(e) => updateScaleArray(et)}
              />
              {et}
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default EventSearch;
