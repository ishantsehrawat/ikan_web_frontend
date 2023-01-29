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
    <div className="w-[350px] md:w-[1100px] bg-white h-44 md:h-60 rounded-xl p-2 md:p-4 flex mb-9">
      <img className="object-cover rounded-lg md:rounded-xl mr-3 md:mr-5 h-40 md:h-56 w-40 md:w-80" src={image} alt={title} />
      <div className="flex w-full flex-col justify-around md:justify-between">
        <div>
          <div className="flex flex-col w-full md:flex-row justify-between">
            <h2 className="text-base md:text-xl font-semibold">{title}</h2>
            <p className="text-gray-500">{location}</p>
          </div>
          <h4 className="hidden md:block text-sm text-gray-700">{organisation}</h4>
        </div>
        <div className="">
          <p className="hidden md:block text-gray-500">{description}</p>
          <p className="text-gray-500 mt-3">{date}</p>
        </div>
        <a
          className="h-8 md:h-10 w-full md:w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
          href="/event-detail"
        >
          Details
        </a>
      </div>
    </div>
  );
}

export default EventTile;
