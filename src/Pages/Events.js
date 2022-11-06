import React from "react";

import { Navbar, EventFinder, EventTile } from "../components";
import { event1 } from "../images";

function Events() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-lightsaffron h-1/2 w-full p-10">
        <Navbar Page="events" />
        <div className="mt-28 ml-5">
          <h1 className="text-4xl font-bold mb-3">Events</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in
            est adipiscing in phasellus non in justo.
          </p>
        </div>
      </div>
      <EventFinder Page="events" />
      <div className="pt-12 flex flex-col items-center">
        <EventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          location="Dwarka, Delhi"
          date="10-11-2022"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <EventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          location="Dwarka, Delhi"
          date="10-11-2022"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <EventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          location="Dwarka, Delhi"
          date="10-11-2022"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <EventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          location="Dwarka, Delhi"
          date="10-11-2022"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <EventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          location="Dwarka, Delhi"
          date="10-11-2022"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
      </div>
    </div>
  );
}

export default Events;
