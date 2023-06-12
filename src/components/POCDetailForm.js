import { Tooltip, Zoom } from "@mui/material";
import React from "react";

function POCDetailForm({ activeStep, user }) {
  return (
    <div
      className={
        activeStep === 4 ? "w-full min-h-[60vh] flex flex-col" : "hidden"
      }
    >
      <Tooltip
        title={
          <div>
            Point of Contact details are taken from your profile.
            <br />
            To change POC, register with another account
          </div>
        }
        placement="top"
        arrow
        TransitionComponent={Zoom}
      >
        <div>
          <div className="w-[45%] my-3">
            <label htmlFor="name" className="font-bold text-lg">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              disabled
              placeholder={user?.name}
              className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            />
          </div>
          {/* </Tooltip> */}
          <div className="w-[45%] my-3">
            <label htmlFor="phone" className="font-bold text-lg">
              Contact Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              disabled
              placeholder={user?.phone}
              className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            />
          </div>
          <div className="w-[45%] my-3">
            <label htmlFor="email" className="font-bold text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              placeholder={user?.email}
              className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default POCDetailForm;
