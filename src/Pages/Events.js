import React from "react";

import { Navbar, EventFinder, EventTile } from "../components";

function Events() {
  return (
    <div>
      <div className=" bg-lightsaffron h-1/2 w-full p-10">
        <Navbar />
        <div className="mt-28 ml-5">
          <h1 className="text-4xl font-bold mb-3">Events</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in
            est adipiscing in phasellus non in justo.
          </p>
        </div>
      </div>
      <EventFinder Page="events" />
      <div className="px-36 pt-12">
        <EventTile />
      </div>
    </div>
  );
}

export default Events;
