import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
import {
  Favorite,
  FavoriteBorderOutlined,
  PersonOutline,
} from "@mui/icons-material";

import { db } from "../firebase-config";
import { eventObject } from "../Data/events";
import { Tooltip } from "@mui/material";
function EventTile({ event, user, setUser }) {
  const [buttonTitle, setbuttonTitle] = useState("Apply Now");
  const [likeTitle, setLikeTitle] = useState("unliked");
  const [eventData, setEventData] = useState({ ...event });

  useEffect(() => {
    if (
      eventData?.interested?.length > 0 &&
      eventData?.interested?.filter((item) => item === user?.email).length > 0
    ) {
      setbuttonTitle("Withdraw");
    }
    if (
      eventData?.liked?.length > 0 &&
      eventData?.liked?.filter((item) => item === user?.email).length > 0
    ) {
      setLikeTitle("liked");
    }
  }, [eventData?.interested, eventData?.liked, user?.email]);

  async function getUserData() {
    const docRef = doc(db, "users", user?.email);
    const snapshots = await getDoc(docRef);
    const docs = snapshots.data();
    setUser(docs);
  }

  async function getEventData() {
    const docRef = doc(db, "events", eventData?.eid);
    const snapshots = await getDoc(docRef);
    const docs = snapshots.data();
    setEventData(docs);
  }

  async function neditUser() {
    const ref = doc(db, "users", user?.email);

    // Atomically add a new region to the "regions" array field.
    const addEventField = {
      events: arrayUnion(eventData?.eid),
    };
    console.log(addEventField);
    const removeEventField = {
      // events: Fieldvalue.arrayRemove(eventData?.eid),
      events: arrayRemove(eventData?.eid),
    };
    console.log(removeEventField);
    await updateDoc(
      ref,
      buttonTitle === "Apply Now" ? addEventField : removeEventField
    ).then((res) => {
      console.log(res);
      if (buttonTitle === "Apply Now")
        window.alert("Event added to your profile!");
      else window.alert("Event removed from your profile!");
    });
    getUserData();
  }
  async function neditUser2() {
    const ref = doc(db, "users", user?.email);

    // Atomically add a new region to the "regions" array field.
    const addEventField = {
      eventsliked: arrayUnion(eventData?.eid),
    };
    console.log(addEventField);
    const removeEventField = {
      // events: Fieldvalue.arrayRemove(eventData?.eid),
      events: arrayRemove(eventData?.eid),
    };
    console.log(removeEventField);
    await updateDoc(
      ref,
      likeTitle === "unliked" ? addEventField : removeEventField
    ).then(() => {
      if (likeTitle === "unliked") window.alert("Event liked to your profile!");
      else window.alert("Event unliked from your profile!");
    });
    getUserData();
  }
  async function neditEvent() {
    const ref = doc(db, "events", eventData?.eid);

    // Atomically add a new region to the "regions" array field.
    const interested = eventData.interested;
    const addEventField = {
      interested: arrayUnion(...interested, user?.email),
      volreq: eventData?.volreq - 1,
    };
    const removeEventField = {
      interested: arrayRemove(user?.email),
      volreq: eventData?.volreq + 1,
    };
    await updateDoc(
      ref,
      buttonTitle === "Apply Now" ? addEventField : removeEventField
    ).then(() => {
      if (buttonTitle === "Apply Now")
        window.alert("Thank you for showing interest in this event");
      else window.alert("You have removed your interest from this event!");
    });
    getEventData();
  }
  async function neditEvent2() {
    const ref = doc(db, "events", eventData?.eid);

    // Atomically add a new region to the "regions" array field.
    const liked = eventData.liked;
    const addEventField = {
      liked: arrayUnion(...liked, user?.email),
    };
    const removeEventField = {
      liked: arrayRemove(user?.email),
    };
    await updateDoc(
      ref,
      likeTitle === "unliked" ? addEventField : removeEventField
    ).then(() => {
      if (likeTitle === "unliked")
        window.alert("Thank you for liking this event");
      else window.alert("You have unliked this event!");
    });
    getEventData();
  }

  function showInterest() {
    if (buttonTitle === "Apply Now") {
      neditUser();
      neditEvent();
      setbuttonTitle("Withdraw");
    } else {
      neditUser();
      neditEvent();
      setbuttonTitle("Apply Now");
    }
  }
  function showLikes() {
    if (likeTitle === "unliked") {
      neditUser2();
      neditEvent2();
      setLikeTitle("liked");
    } else {
      neditUser2();
      neditEvent2();
      setLikeTitle("unliked");
    }
  }
  return (
    <div className="mt-4 bg-white rounded-xl w-[350px] md:w-[1100px] flex flex-col md:flex-row p-2 gap-4">
      <img
        className="w-full md:w-80 h-[200px] md:h-56 rounded-lg object-cover"
        src={event?.img}
        alt="event"
      />
      <div className="flex flex-col md:flex-col justify-between w-full">
        <div className=" flex flex-col h-full gap-2 mb-4">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Tooltip title={`${event?.name}`} placement="top" arrow>
                <h1 className="text-lg font-semibold truncate max-w-[220px] md:max-w-[450px]">
                  {event?.name}
                </h1>
              </Tooltip>
              <p className="bg-saffron w-max h-max px-2 rounded-sm text-white text-sm hidden md:block">
                {eventObject[event?.type - 1].type}
              </p>
            </div>
            <div className="flex md:mr-4 gap-2">
              <Tooltip
                title={`${event?.interested?.length} volunteers applied`}
                placement="top"
                arrow
              >
                <p className="text-lg flex items-center">
                  <PersonOutline />
                  {event?.interested?.length}
                </p>
              </Tooltip>
              <Tooltip
                title={`${event?.likes} volunteers liked`}
                placement="top"
                arrow
              >
                <p className="text-lg flex items-center">
                  <FavoriteBorderOutlined />
                  {event?.likes}
                </p>
              </Tooltip>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <Tooltip
              title={`${event?.organisation} is organising this event`}
              placement="top"
              arrow
            >
              <p className="text-sm -mt-2 mb-2 truncate max-w-[200px] md:max-w-[700px]">
                by {event?.organisation}
              </p>
            </Tooltip>
            <p className="bg-saffron w-max px-2 rounded-sm text-white text-sm block md:hidden">
              {eventObject[event?.type - 1].type}
            </p>
          </div>
          <Tooltip
            title={`${event?.description}`}
            placement="top"
            arrow
            classes={{ tooltip: "w-max" }}
          >
            <p className="hidden md:block text-black md:text-gray-500 truncate max-w-[700px] w-min">
              {event?.description}
            </p>
          </Tooltip>
          <div className="w-full flex md:block justify-between">
            <p className="text-black md:text-gray-500">{event?.date}</p>
            <p className="text-black md:text-gray-500 truncate max-w-[220px]">
              {event?.City}, {event?.State}, {event?.Country}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <button
              className={
                buttonTitle === "Apply Now"
                  ? "h-8 md:h-10 w-max p-4 md:w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
                  : "h-8 md:h-10 w-max p-4 md:w-36 text-sm bg-black text-white rounded-md flex justify-center items-center"
              }
              disabled={event?.volreq <= 0 ? true : false}
              onClick={showInterest}
            >
              {buttonTitle}
            </button>
            <a
              className="h-8 md:h-10 w-max px-4 md:w-36 text-sm bg-white text-black rounded-md flex justify-center items-center border-2 border-black"
              href={`/event-detail/${event?.eid}`}
            >
              View Details
            </a>
          </div>

          <button onClick={showLikes}>
            <Favorite
              className="h-8 md:h-10 w-8 md:w-10 md:mr-4"
              sx={{
                color: `${likeTitle === "unliked" ? "#FFFFFF" : "#ff3140"}`,
                stroke: "red",
                // fontSize: 40,
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventTile;