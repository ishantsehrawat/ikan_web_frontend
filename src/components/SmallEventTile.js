import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { Favorite } from "@mui/icons-material";

import { group } from "../images/icons";
import { db } from "../firebase-config";

function SmallEventTile({
  image,
  title,
  organisation,
  description,
  location,
  date,
  volunteers,
  user,
  setUser,
  eid = undefined,
}) {
  const [buttonTitle, setbuttonTitle] = useState("Apply Now");
  const [likeTitle, setLikeTitle] = useState("unliked");
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      const docRef = doc(db, "events", eid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEventData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getEvent();
  }, [eid]);

  useEffect(() => {
    if (
      // eventData?.interested?.length > 0 &&
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
    ).then((res) => {
      console.log(res);
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
    <div className="mt-4 bg-white rounded-xl w-[370px] p-2">
      <img
        className="w-full h-[200px] rounded-lg object-cover"
        src={eventData?.img}
        alt="event"
      />
      <div>
        <div className="flex justify-between p-2">
          <h1 className="text-lg font-semibold">{eventData?.name}</h1>
          <p className="text-lg ml-5 flex items-center gap-2">
            <img className="h-4 w-6" src={group} alt="V" />
            {eventData?.interested?.length}
          </p>
        </div>
        <p className="p-2">{eventData?.date}</p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <button
            className={
              buttonTitle === "Apply Now"
                ? "h-8 md:h-10 w-max p-4 md:w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
                : "h-8 md:h-10 w-max p-4 md:w-36 text-sm bg-black text-white rounded-md flex justify-center items-center"
            }
            disabled={eventData?.volreq <= 0 ? true : false}
            onClick={showInterest}
          >
            {buttonTitle}
          </button>
          <a
            className="h-8 md:h-10 w-max px-4 md:w-36 text-sm bg-white text-black rounded-md flex justify-center items-center border-2 border-black"
            href={`/event-detail/${eventData?.eid}`}
          >
            View Details
          </a>
        </div>
        <button onClick={showLikes}>
          <Favorite
            className="h-8 md:h-10 w-8 md:w-10"
            sx={{
              color: `${likeTitle === "unliked" ? "#FFFFFF" : "#ff3140"}`,
              stroke: "red",
              // fontSize: 40,
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default SmallEventTile;
