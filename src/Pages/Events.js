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

import { Navbar, EventFinder, EventTile, Footer } from "../components";

function Events() {
  const eventRef = collection(db, "events");
  const [events, setevents] = useState([]);
  const { loc, date, eventTypeID } = useParams();

  // fetching events on page load
  useEffect(() => {
    eventTypeID === undefined ? fetchData() : getEvent();
  }, [eventTypeID]);

  // creating eventType array from eventTypeID
  if (eventTypeID !== undefined) {
    var type = [];
    var digits = eventTypeID.toString().split("");
    type = digits.map(String);
    if (type[0] === "0") {
      type = ["1", "2", "3", "4", "5", "6", "7"];
    }
  }

  // splitting location into city, state and country
  var city;
  var state;
  var country;
  if (loc !== undefined) {
    city = loc.split(", ")[0];
    state = loc.split(", ")[1];
    country = loc.split(", ")[2];
  }

  // fetching all events
  async function fetchData() {
    try {
      const q = query(eventRef, orderBy("name"));
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
        where("type", "in", type),
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
      <EventFinder Page="events" />
      <p className="text-gray-400 pt-10 pl-20">{events.length} events found</p>
      <div className="pt-12 flex flex-col items-center">
        {events.map((event) => (
          <EventTile key={event.eid} event={event} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Events;
