import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { collection, getCountFromServer } from "firebase/firestore";

import { db } from "../firebase-config";

function ExploreCounter() {
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);

  async function getUser() {
    const snapshots = await getCountFromServer(collection(db, "users"));
    const docs = snapshots.data().count;
    setUserCount(docs);
  }

  async function getEventCount() {
    const snapshots = await getCountFromServer(collection(db, "events"));
    const docs = snapshots.data().count;
    setEventCount(docs);
  }

  async function getOrgCount() {
    const snapshots = await getCountFromServer(collection(db, "organisations"));
    const docs = snapshots.data().count;
    setOrgCount(docs);
  }

  useEffect(() => {
    getUser();
    getEventCount();
    getOrgCount();
  }, []);

  return (
    <div className="bg-exploreCounterBG w-[1100px] h-[595px] bg-cover bg-center rounded-3xl mb-10">
      <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50 rounded-3xl flex-col gap-20">
        <span className="text-white text-8xl font-medium">Explore.</span>
        <div className="flex w-full justify-around">
          <div className="flex flex-col justify-center items-center w-96 ">
            <span className="text-white text-8xl font-medium">
              <CountUp
                end={userCount}
                enableScrollSpy="true"
                delay={500}
                duration={7}
              />
            </span>
            <span className="text-white text-4xl font-medium">
              People Helped
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-96">
            <span className="text-white text-8xl font-medium">
              <CountUp
                end={orgCount}
                enableScrollSpy="true"
                delay={500}
                duration={7}
              />
            </span>
            <span className="text-white text-4xl font-medium">NGO Collabs</span>
          </div>
          <div className="flex flex-col justify-center items-center w-96">
            <span className="text-white text-8xl font-medium">
              <CountUp
                end={eventCount}
                enableScrollSpy="true"
                delay={500}
                duration={7}
              />
            </span>
            <span className="text-white text-4xl font-medium">Events</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCounter;
