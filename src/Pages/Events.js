import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  query,
  orderBy,
  collection,
  getDocs,
  where,
  and,
} from "firebase/firestore";
import { db } from "../firebase-config";

import { Navbar, EventTile, Footer, EventSearch } from "../components";

function Events() {
  const eventRef = collection(db, "events");
  const [events, setevents] = useState([]);
  const { city, state, country, date, eventTypeID } = useParams();

  // fetching events on page load
  useEffect(() => {
    eventTypeID === undefined ? fetchData() : getEvent();
  }, [eventTypeID]);

  // creating eventTypeIDArray from eventTypeIDString
  const eventTypeIDArray = eventTypeID?.split(",");

  // fetching all events
  async function fetchData() {
    try {
      // const q = query(eventRef, orderBy("name"));
      const q = query(eventRef, where("volreq", ">", 0));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs) {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          let event = doc.data();
          event.eid = doc.id;
          data.push(event);
        });
        setevents(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // fetching events based on search parameters
  async function getEvent() {
    const q = query(
      eventRef,
      and(
        where("type", "in", eventTypeIDArray),
        where("volreq", ">", 0),
        where("date", "==", date),
        where("City", "==", city),
        where("State", "==", state),
        where("Country", "==", country)
      )
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs) {
      const data = [];
      querySnapshot.docs.forEach((doc) => {
        let event = doc.data();
        event.eid = doc.id;
        data.push(event);
      });
      setevents(data);
    }
  }

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader  h-1/2 w-full p-4 md:p-10">
        <Navbar Page="events" />
        <div className="mt-20 text-white md:mt-28 ml-5 mb-10">
          <h1 className="text-4xl font-bold mb-3">Events</h1>
          <p>
            Discover volunteer opportunities that match your interests and
            availability. Join us and make a difference.
          </p>
        </div>
      </div>
      {/* <EventFinder Page="events" /> */}
      <div className="px-10">
        <EventSearch page="events" />
        <p className="text-gray-400 pt-10 pl-20">
          {events.length} events found
        </p>
        <div className="pt-12 flex flex-col items-center">
          {events.map((event) => (
            <EventTile key={event.eid} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Events;
