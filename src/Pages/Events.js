import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  query,
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  and,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";

import { Navbar, EventTile, Footer, EventSearch } from "../components";

function Events() {
  const eventRef = collection(db, "events");
  const [events, setevents] = useState([]);
  const { city, state, country, date, eventTypeID } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = auth.currentUser;
    const colRef = doc(db, "users", String(currentUser?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setUser(docs);
    };

    getUser();
  }, []);

  // fetching events on page load
  useEffect(() => {
    eventTypeID === undefined ? fetchData() : getEvent(); // eslint-disable-next-line
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
        data.sort((a, b) => {
          return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
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
        where("date", "<=", date),
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
      data.sort((a, b) => {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
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
            <EventTile
              key={event.eid}
              event={event}
              user={user}
              setUser={setUser}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Events;
