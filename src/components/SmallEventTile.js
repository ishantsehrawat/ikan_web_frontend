import React from 'react'

import {group } from "../images/icons"

function SmallEventTile({
    image,
    title,
    organisation,
    description,
    location,
    date,
    volunteers
  }) {
  return (
    <div className="mt-4 bg-white rounded-xl w-[350px] p-2">
        <img className="w-full h-[200px] rounded-lg" src={image} alt="event" />
        <div>
            <div className="flex justify-between p-2">
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-lg ml-5 flex items-center gap-2"><img className="h-4 w-6" src={group} alt="V" />
                {volunteers}</p>
            </div>
            <p className="p-2">{date}</p>
        </div>
    </div>
  )
}

export default SmallEventTile