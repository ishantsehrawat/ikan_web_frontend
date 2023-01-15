import React, {useState} from 'react'

import {SmallEventTile, OverlayBackground, AddEvent} from "./"
import {event1} from "../images"

function EventList() {
    const [overlayOpen, setoverlayOpen] = useState(false)

    return (
        <div className="p-10">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">Your Events</h1>
                <a href="/add-event" className="h-10 ml-12 w-20 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2">Add</a>
            </div>
            <div className="flex flex-wrap gap-4 w-full">

            <SmallEventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          date="10-11-2022"
          volunteers="16"
        />
        <SmallEventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          date="10-11-2022"
          volunteers="16"
        />
        <SmallEventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          date="10-11-2022"
          volunteers="16"
        />
        <SmallEventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          date="10-11-2022"
          volunteers="16"
        />
        <SmallEventTile
          image={event1}
          title="Food Distribution: Zero Hunger"
          organisation="Drishti"
          date="10-11-2022"
          volunteers="16"
        />
          </div>
          <div>
        <OverlayBackground Overlay={overlayOpen} setBackButton={setoverlayOpen} />
        <AddEvent overlayOpen={overlayOpen} />
      </div>
        </div>
    )
}

export default EventList