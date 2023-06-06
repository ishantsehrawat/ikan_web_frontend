import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

import { db, auth } from "../firebase-config";
import { Navbar, Footer, EventTile, ExploreCounter } from "../components";

function Explore() {
  const [mostLikedEvents, setMostLikedEvents] = useState([]);
  const [user, setUser] = useState({});

  const event = {
    type: "2",
    date: "2023-03-30",
    eid: "plant@1680160984483",
    name: "plant",
    State: "Delhi",
    City: "New Delhi",
    interested: ["ishantsehrawat75@gmail.com"],
    volreq: 2,
    description: "ffood",
    host: "ishantsehrawat@bpitindia.com",
    Country: "India",
    img: "https://firebasestorage.googleapis.com/v0/b/ikan-47608.appspot.com/o/volunteer.jpeg1680160956686?alt=media&token=5a7581b9-8978-48ab-ab70-de3dcd9b75c7",
    organisation: "ishant",
  };

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

  async function fetchData() {
    const q = query(collection(db, "events"), orderBy("likes", "desc"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs) {
      const data = [];
      querySnapshot.docs.forEach((doc) => {
        let event = doc.data();
        event.eid = doc.id;
        if (event.volreq > 0) data.push(event);
      });
      setMostLikedEvents(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader  h-1/2 w-full p-4 md:p-10">
        <Navbar Page="events" />
        <div className="mt-20 text-white md:mt-28 ml-5 mb-10">
          <h1 className="text-4xl font-bold mb-3">Explore</h1>
          <p>
            Discover volunteer opportunities that match your interests and
            availability. Join us and make a difference.
          </p>
        </div>
      </div>
      <div className="px-10">
        <p className="text-gray-400 pt-10 pl-20"></p>
        <div className="pt-12 flex flex-col items-center">
          {mostLikedEvents.map((event, id) => {
            if (id === 2) {
              return (
                <div>
                  <ExploreCounter />
                  <EventTile
                    key={event.eid}
                    event={event}
                    user={user}
                    setUser={setUser}
                  />
                </div>
              );
            } else {
              return (
                <EventTile
                  key={event.eid}
                  event={event}
                  user={user}
                  setUser={setUser}
                />
              );
            }
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
