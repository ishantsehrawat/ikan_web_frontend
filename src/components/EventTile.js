import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase-config";

function EventTile({ event }) {
  const [buttonTitle, setbuttonTitle] = useState("Apply Now");
  const [eventData, setEventData] = useState({ ...event });
  const [user, setUser] = useState({});
  const currentUser = auth.currentUser;

  useEffect(() => {
    const colRef = doc(db, "users", String(currentUser?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setUser({ ...docs, events: [] });
    };

    getUser();
  }, [currentUser]);

  useEffect(() => {
    if (eventData?.interested && user?.email) {
      const asArray = Object.entries(event?.interested);
      asArray?.map((email) => {
        if (email[1] === user?.email) {
          setbuttonTitle("Withdraw");
        }
        return 0;
      });
    }
  });

  // async function showInterest() {
  //   if (buttonTitle === "Apply Now") {
  //     setbuttonTitle("Withdraw");
  //     setEventData({
  //       ...eventData,
  //       interested: eventData?.interested.concat(user?.email),
  //       volreq: eventData?.volreq - 1,
  //       volreq: eventData?.volreq - 1,
  //     });
  //     // const uasArray = Object.entries(user?.events);
  //     // uasArray.push(eventData?.eid);
  //     // console.log(uasArray);
  //     // const events = user?.events?.concat(eventData?.eid);

  //     setUser({
  //       ...user,
  //       events: user?.events?.concat(eventData?.eid),
  //     });
  //     setUser({
  //       ...user,
  //     });
  //     console.log(user?.events);
  //   } else {
  //     setbuttonTitle("Apply Now");
  //     console.log("withdraw");
  //     setEventData({
  //       ...eventData,
  //       interested: eventData?.interested.filter(
  //         (item) => item !== user?.email
  //       ),
  //       volreq: eventData?.volreq + 1,
  //     });
  //     setUser({
  //       ...user,
  //       events: user?.events?.filter((item) => item !== eventData?.eid),
  //     });
  //   }

  //   // console.log(eventData?.interested);
  // }

  // useEffect(() => {
  //   async function editEvent() {
  //     await updateDoc(doc(db, "events", eventData?.eid), eventData).then(() => {
  //       if (buttonTitle === "Apply Now")
  //         console.log("Thank you for showing interest in this event!");
  //       else console.log("You have removed your interest from this event!");
  //     });
  //   }
  //   editEvent();
  //   async function editUser() {
  //     await updateDoc(doc(db, "users", user?.email), user).then(() => {
  //       if (buttonTitle === "Apply Now")
  //         console.log("Event added to your profile!");
  //       else console.log("Event removed from your profile");
  //     });
  //   }
  //   editUser();
  // }, [eventData, user, buttonTitle]);

  async function showInterest() {
    if (buttonTitle === "Apply Now") {
      setEventData((prevState) => {
        const updatedInterested = [...prevState.interested, user.email];
        return {
          ...prevState,
          interested: updatedInterested,
          volreq: prevState.volreq - 1,
        };
      });
      setUser((prevState) => {
        const updatedEvents = [...prevState.events, eventData.eid];
        return { ...prevState, events: updatedEvents };
      });
    } else {
      setEventData((prevState) => {
        const updatedInterested = prevState.interested.filter(
          (email) => email !== user.email
        );
        return {
          ...prevState,
          interested: updatedInterested,
          volreq: prevState.volreq + 1,
        };
      });
      setUser((prevState) => {
        const updatedEvents = prevState.events.filter(
          (eventId) => eventId !== eventData.eid
        );
        return { ...prevState, events: updatedEvents };
      });
      console.log(eventData?.interested);
    }
    // console.log(eventData?.interested);
    // console.log(user?.events);
  }

  useEffect(() => {
    // if (user) {
    //   console.log(user);
    // }
    if (user?.events && user?.events.indexOf(eventData?.eid) !== -1) {
      console.log(user?.events);
      updateDoc(doc(db, "users", user?.email), user).then(() => {
        if (buttonTitle === "Apply Now") {
          setbuttonTitle("Withdraw");
          window.alert("Event added to your profile!");
        } else {
          setbuttonTitle("Apply Now");
          window.alert("Event removed from your profile");
        }
      });
      console.log("User is interested in this event");
    }
  }, [user]);

  useEffect(() => {
    if (
      eventData?.interested &&
      eventData?.interested.indexOf(user?.email) !== -1
    ) {
      console.log(eventData?.interested);
      updateDoc(doc(db, "events", eventData?.eid), eventData).then(() => {
        if (buttonTitle === "Apply Now") {
          window.alert("Thank you for showing interest in this event!");
        } else {
          window.alert("You have removed your interest from this event!");
        }
      });
    }
  }, [eventData]);

  // console.log(eventData?.interested);
  // console.log(user?.events);
  return (
    <div className="w-[350px] md:w-[1100px] bg-white h-44 md:h-60 rounded-xl p-2 md:p-4 flex mb-9">
      <img
        className="object-cover rounded-lg md:rounded-xl mr-3 md:mr-5 h-40 md:h-56 w-40 md:w-80"
        src={event?.img}
        alt={event?.name}
      />
      <div className="flex w-full flex-col justify-around md:justify-between">
        <div>
          <div className="flex w-full flex-col md:flex-row justify-between">
            <h2 className="text-base md:text-xl font-semibold">
              {event?.name}
            </h2>
            <p className="text-gray-500">
              {event?.City + ", " + event?.State + ", " + event?.Country}
            </p>
          </div>
          <h4 className="hidden md:block text-sm text-gray-700">
            {event?.organisation}
          </h4>
        </div>
        <div className="">
          <p className="hidden md:block text-gray-500">{event?.description}</p>
          <p className="text-gray-500 mt-3">{event?.date}</p>
          <p className="text-gray-500 mt-3">{eventData?.volreq}</p>
        </div>
        <div className="flex gap-2">
          <button
            className={
              buttonTitle === "Apply Now"
                ? "h-8 md:h-10 w-full md:w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
                : "h-8 md:h-10 w-full md:w-36 text-sm bg-black text-white rounded-md flex justify-center items-center"
            }
            onClick={showInterest}
          >
            {buttonTitle}
          </button>
          <a
            className="h-8 md:h-10 w-full md:w-36 text-sm bg-white text-black rounded-md flex justify-center items-center border-2 border-black"
            href={`/event-detail/${event?.eid}`}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventTile;
