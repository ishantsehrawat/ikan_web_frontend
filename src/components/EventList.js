import React from "react";

import { SmallEventTile } from "./";
import { event1 } from "../images";

function EventList({ user, title }) {
  return (
    <div className="p-10">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {user?.type === "organisation" && title === "Your Events" ? (
          <a
            href="/add-event"
            className="h-10 ml-12 w-20 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2"
          >
            Add
          </a>
        ) : null}
      </div>
      <div className="flex overflow-x-scroll gap-4 w-full pb-4">
        {title === "Your Events"
          ? user?.events?.map((eid) => (
              <SmallEventTile
                eid={eid}
                key={eid}
                user={user}
                image={event1}
                title="Food Distribution: Zero Hunger"
                organisation="Drishti"
                date="10-11-2022"
                volunteers="16"
              />
            ))
          : user?.eventsliked?.map((eid) => (
              <SmallEventTile
                eid={eid}
                key={eid}
                user={user}
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
