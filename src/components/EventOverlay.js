import React from "react";

function EventOverlay({
  uEvent,
  setuEvent,
  eventType,
  setEventType,
  setcheck,
  check,
  setev,
}) {
  // update event type
  const updateArray = (id) => {
    const newArray = [...check];
    newArray[id - 1] = !newArray[id - 1];
    setev((prev) => prev * 10 + id);
    setcheck(newArray);
  };

  return (
    <div
      className={
        uEvent
          ? "absolute z-20 p-4 w-[330px] bg-cgrey rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "hidden"
      }
    >
      <div className="py-1 h-auto w-full">
        {eventType.map((et) => (
          <div className="py-1" key={et.id}>
            <input
              type="checkbox"
              className="mr-2"
              name={et.type}
              value={et.id}
              onChange={(e) => updateArray(et.id)}
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
