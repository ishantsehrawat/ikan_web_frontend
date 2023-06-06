import React from "react";

import { SmallEventTile } from "./";
import { event1 } from "../images";

function EventList({ user }) {
  return (
    <div className="p-10">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Your Events</h1>
        <a
          href="/add-event"
          className="h-10 ml-12 w-20 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2"
        >
          Add
        </a>
      </div>
      <div className="flex flex-wrap gap-4 w-full">
        {user?.events?.map((eid) => (
          <SmallEventTile
            eid={eid}
            key={eid}
            image={event1}
            title="Food Distribution: Zero Hunger"
            organisation="Drishti"
            date="10-11-2022"
            volunteers="16"
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;
