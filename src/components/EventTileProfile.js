import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";

import { db } from "../firebase-config";
import {
  FavoriteBorder,
  FavoriteOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

let date = dayjs().date();
let month = dayjs().month() + 1;
let year = dayjs().year();
const separator = "-";

const today = `${year}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${date}`;

function EventTileProfile({ eid, timeline }) {
  const [eventData, setEventData] = useState({});

  console.log(eid);
  console.log(today <= eventData?.date ? "onGoing" : "upcoming");

  useEffect(() => {
    const colRef = doc(db, "events", String(eid));
    const getEvent = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setEventData(docs);
    };

    getEvent();
  }, [eid]);

  if (today <= eventData?.date && timeline === "future")
    return (
      <div className="w-[350px] h-[300px] bg-bluegrey rounded-xl text-white">
        <div className="w-full h-[250px] rounded-xl relative">
          <div className="w-full h-full absolute top-0 right-0 opacity-0 hover:opacity-100 bg-[rgba(0,0,0,0.5)] rounded-xl z-10 flex justify-center items-center transition duration-500 ease-in-out">
            <a
              href={`/event-detail/${eid}`}
              className="border-2 border-white rounded-lg px-5 py-1 z-30"
            >
              View details
            </a>
          </div>
          <img
            src={eventData?.img}
            alt=""
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </div>
        <div className="w-full h-[50px] px-5 flex justify-between items-center text-saffron">
          <p className="text-xl font-bold ">{eventData?.name}</p>
          <div className="flex gap-2">
            <div className="flex ">
              <FavoriteBorder className="!mt-0.5" fontSize="small" />
              <p>{eventData?.likes}</p>
            </div>
            <div className="flex ">
              <PersonOutlineOutlined className="!mt-0.5" fontSize="small" />
              <p>{eventData?.interested?.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  else if (today > eventData?.date && timeline === "past")
    return (
      <div className="w-[350px] h-[300px] bg-bluegrey rounded-xl text-white">
        <div className="w-full h-[250px] rounded-xl relative">
          <div className="w-full h-full absolute top-0 right-0 opacity-0 hover:opacity-100 bg-[rgba(0,0,0,0.5)] rounded-xl z-10 flex justify-center items-center transition duration-500 ease-in-out">
            <a
              href={`/event-detail/${eid}`}
              className="border-2 border-white rounded-lg px-5 py-1 z-30"
            >
              View details
            </a>
          </div>
          <img
            src={eventData?.img}
            alt=""
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </div>
        <div className="w-full h-[50px] px-5 flex justify-between items-center text-saffron">
          <p className="text-xl font-bold ">{eventData?.name}</p>
          <div className="flex gap-2">
            <div className="flex ">
              <FavoriteBorder className="!mt-0.5" fontSize="small" />
              <p>{eventData?.likes}</p>
            </div>
            <div className="flex ">
              <PersonOutlineOutlined className="!mt-0.5" fontSize="small" />
              <p>{eventData?.interested?.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
}

export default EventTileProfile;
