import React from "react";
import { AddAPhoto } from "@mui/icons-material";

function VerifcationDetailsForm({
  activeStep,
  organisationData,
  setOrganisationData,
}) {
  return (
    <div className={activeStep === 2 ? "w-full flex flex-col" : "hidden"}>
      <div className="flex justify-between gap-4">
        <div className="md:w-[45%] my-3">
          <label htmlFor="PAN" className="font-bold text-lg">
            PAN Card Number
          </label>
          <input
            type="text"
            name="PAN"
            id="PAN"
            placeholder="AABCD1234E"
            value={
              organisationData?.VerificationDetails?.PanNumber
                ? organisationData?.VerificationDetails?.PanNumber
                : ""
            }
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            onChange={(e) => {
              var newOrganisationData = { ...organisationData };
              newOrganisationData.VerificationDetails = {
                ...newOrganisationData.VerificationDetails,
                PanNumber: e.target.value,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          />
        </div>
        <div className="md:w-[45%] h-16 mt-11 md:mt-7 ">
          <input
            type="file"
            name="file"
            id="file"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]"
          />
          <label
            className="text-[white] bg-[black] inline-block cursor-pointer focus:bg-red hover:bg-red"
            htmlFor="file"
          >
            <div className="flex h-full items-center gap-4">
              <div className="bg-bluegrey rounded-full h-12 md:h-16 w-12 md:w-16 flex justify-center items-center">
                <AddAPhoto sx={{ fontSize: 32, color: "#000000" }} />
              </div>{" "}
              <p className="font-bold text-lg hidden md:block">PAN Card</p>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="md:w-[45%] my-3">
          <label htmlFor="regno" className="font-bold text-lg">
            Registeration Number
          </label>
          <input
            type="text"
            name="regno"
            id="regno"
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            placeholder="CIN/LLPIN"
            value={
              organisationData?.VerificationDetails?.RegisterationNumber
                ? organisationData?.VerificationDetails?.RegisterationNumber
                : ""
            }
            onChange={(e) => {
              var newOrganisationData = { ...organisationData };
              newOrganisationData.VerificationDetails = {
                ...newOrganisationData.VerificationDetails,
                RegisterationNumber: e.target.value,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          />
        </div>
        <div className="md:w-[45%] h-16 mt-11 md:mt-7 ">
          <input
            type="file"
            name="file"
            id="file"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]"
          />
          <label
            className="text-[white] bg-[black] inline-block cursor-pointer focus:bg-red hover:bg-red"
            htmlFor="file"
          >
            <div className="flex h-full items-center gap-4">
              <div className="bg-bluegrey rounded-full h-12 md:h-16 w-12 md:w-16 flex justify-center items-center">
                <AddAPhoto sx={{ fontSize: 32, color: "#000000" }} />
              </div>{" "}
              <p className="font-bold text-lg hidden md:block">
                Registeration Certificate
              </p>
            </div>
          </label>
        </div>
      </div>
      <div className="w-full my-3">
        <label htmlFor="FCRA" className="font-bold text-lg">
          FCRA Number
        </label>
        <input
          type="text"
          name="FCRA"
          id="FCRA"
          placeholder="999999999"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          value={
            organisationData?.VerificationDetails?.FCRA
              ? organisationData?.VerificationDetails?.FCRA
              : ""
          }
          onChange={(e) => {
            var newOrganisationData = { ...organisationData };
            newOrganisationData.VerificationDetails = {
              ...newOrganisationData.VerificationDetails,
              FCRA: e.target.value,
            };
            setOrganisationData({ ...newOrganisationData });
          }}
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="darpan" className="font-bold text-lg">
          Darpan ID
        </label>
        <input
          type="text"
          name="darpan"
          id="darpan"
          placeholder="DL/2023/7777777"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          value={
            organisationData?.VerificationDetails?.DarpanID
              ? organisationData?.VerificationDetails?.DarpanID
              : ""
          }
          onChange={(e) => {
            var newOrganisationData = { ...organisationData };
            newOrganisationData.VerificationDetails = {
              ...newOrganisationData.VerificationDetails,
              DarpanID: e.target.value,
            };
            setOrganisationData({ ...newOrganisationData });
          }}
        />
      </div>
    </div>
  );
}

export default VerifcationDetailsForm;
