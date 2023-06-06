import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

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
  eid = undefined,
}) {
  const [event, setevent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      const docRef = doc(db, "events", eid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setevent(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getEvent();
  }, [eid]);

  return (
    <a
      href={`/event-detail/${event?.eid}`}
      className="mt-4 bg-white rounded-xl w-[350px] p-2"
    >
      <img
        className="w-full h-[200px] rounded-lg"
        src={event?.img}
        alt="event"
      />
      <div>
        <div className="flex justify-between p-2">
          <h1 className="text-lg font-semibold">{event?.name}</h1>
          <p className="text-lg ml-5 flex items-center gap-2">
            <img className="h-4 w-6" src={group} alt="V" />
            {event?.interested?.length}
          </p>
        </div>
        <p className="p-2">{event?.date}</p>
      </div>
    </a>
  );
}

export default SmallEventTile;
