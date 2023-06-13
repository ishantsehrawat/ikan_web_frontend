import { Tooltip, Zoom } from "@mui/material";
import React, { useEffect } from "react";

function POCDetailForm({
  activeStep,
  user,
  organisationData,
  setOrganisationData,
}) {
  useEffect(() => {
    var newOrganisation = { ...organisationData };
    newOrganisation.POC = {
      ...newOrganisation?.POC,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    };
    setOrganisationData({ ...newOrganisation });
  }, [user]);

  return (
    <div className={activeStep === 4 ? "w-full flex flex-col" : "hidden"}>
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
          <div className="w-full md:w-[45%] my-3">
            <label htmlFor="name" className="font-bold text-lg">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              disabled
              readOnly={true}
              value={user?.name || ""}
              className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            />
          </div>
          <div className="w-full md:w-[45%] my-3">
            <label htmlFor="phone" className="font-bold text-lg">
              Contact Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              disabled
              readOnly={true}
              value={user?.phone || ""}
              className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            />
          </div>
          <div className="w-full md:w-[45%] my-3">
            <label htmlFor="email" className="font-bold text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              readOnly={true}
              value={user?.email || ""}
              className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default POCDetailForm;
