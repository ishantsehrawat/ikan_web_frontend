import React from "react";

function EventTile({
  image,
  title,
  organisation,
  description,
  location,
  date,
}) {
  return (
    <div className="w-[1100px] bg-white h-60 rounded-xl p-4 flex mb-9">
      <img className="rounded-xl mr-5 h-56 w-80" src={image} alt={title} />
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-500">{location}</p>
          </div>
          <h4 className="text-sm text-gray-700">{organisation}</h4>
        </div>
        <div className="">
          <p className="text-gray-500">{description}</p>
          <p className="text-gray-500 mt-3">{date}</p>
        </div>
        <a
          className="h-10 w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
          href="/event-detail"
        >
          Details
        </a>
      </div>
    </div>
  );
}

export default EventTile;
