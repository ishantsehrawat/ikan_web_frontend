import React, { useEffect, useState } from "react";
// import { query, collection, getDocs, where, onSnapshot } from "firebase/firestore";
import { collection, getDocs} from "firebase/firestore";
// import {useParams} from "react-router-dom"


import { Navbar, EventFinder, EventTile, Footer } from "../components";
import { db } from "../firebase-config"
// import { event1 } from "../images";

function Events() {
  const [eventArray, setEventArray] = useState([]);
  // const [queryData, setQueryData] = useState([]);
  // const eventRef = collection(db, "events");
  // let fetchedData = [];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(query(collection(db, "event"), where("name", "==", "Daaru Donation")));
  //       if (querySnapshot.docs) {
  //         querySnapshot.docs.forEach((doc) => {
  //           console.log("trigger")
  //           if (!eventArray.includes(doc.data()))
  //             setEventArray((prev) => ([...prev, doc.data()]))
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [])
  useEffect(() => {
    const getAllEvents = async () => {
      const data = await getDocs(collection(db, "events"));
      // const querySnapshot = await getDocs(query(collection(db, "event"), where("name", "==", "Daaru Donation")));
      // setQueryData(querySnapshot.docs.map((doc)=>({...doc.data()})))
      setEventArray(data.docs.map((doc) => ({ ...doc.data()})));
    };

    getAllEvents();
  }, []);
  // const param = useParams();

  // useEffect(() => {
  //   const getQueryUsers = async () => {
  //     // const data = await getDocs(collection(db, "events"));
  //     const querySnapshot = await getDocs(query(collection(db, "event"), where("name", "==", "Daaru donation")));
  //     // console.log(querySnapshot);
  //     setQueryData(querySnapshot.docs.forEach((doc)=>({...doc.data()})))
  //     console.log(queryData);
  //     console.log("trigger");
  //     // setEventArray(data.docs.map((doc) => ({ ...doc.data()})));
  //   };

  //   getQueryUsers();
  // }, []);

  // console.log(queryData);

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader  h-1/2 w-full p-4 md:p-10">
        <Navbar Page="events" />
        <div className="mt-20 text-white md:mt-28 ml-5 mb-10">
          <h1 className="text-4xl font-bold mb-3">Events</h1>
          <p>
            Discover volunteer opportunities that match your interests and availability. Join us and make a difference.
          </p>
        </div>
      </div>
      <EventFinder Page="events" />
      <div className="pt-12 flex flex-col items-center">
        {eventArray?.map((event) => (
                <EventTile
                image={event?.img}
                title={event?.name}
                organisation={event?.host}
                location={event?.Country+", "+event?.State+", "+event?.City}
                date={event?.date}
                description={event?.description}
                type={event?.type}
                />
              ))}
        
      </div>
      <Footer />
    </div>
  );
}

export default Events;
