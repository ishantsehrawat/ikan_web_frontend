import React from "react";

function EventOverlay({ uEvent, setuEvent, eventType, setEventType }) {
  console.log(eventType.map((et) => et.isChecked));
  return (
    <div
      className={
        uEvent
          ? "absolute z-20 p-4 w-[400px] bg-cgrey rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "hidden"
      }
    >
      <div className="w-full px-2 h-12 shadow-[0px 2px 70px rgba(0, 0, 0, 0.1)] flex items-center rounded-lg text-lg bg-white">
        {eventType
          .filter((et) => et.isChecked === true)
          .map((et) => (
            <p className="pl-2">{et.type},</p>
          ))}
      </div>
      <div className="py-1 h-auto w-full">
        {eventType.map((et) => (
          <div className="py-1">
            <input
              type="radio"
              className="mr-2"
              name={et.type}
              value={et.id}

              // onChange={(e) =>
              //   setEventType(
              //     eventType
              //       .filter((et) => et.id === e.target.value)
              //       .map((et) => (et.isChecked = !et.isChecked))
              //   )
              // }
            />
            <label>{et.type}</label>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="bg-saffron text-white rounded-lg w-40 h-12"
          onClick={() => setuEvent(false)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EventOverlay;
