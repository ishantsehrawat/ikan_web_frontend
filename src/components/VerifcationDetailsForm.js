import React from "react";
import { AddAPhoto } from "@mui/icons-material";

function VerifcationDetailsForm({ activeStep }) {
  return (
    <div
      className={
        activeStep === 2 ? "w-full min-h-[60vh] flex flex-col" : "hidden"
      }
    >
      <div className="flex justify-between">
        <div className="w-[45%] my-3">
          <label htmlFor="PAN" className="font-bold text-lg">
            PAN Card Number
          </label>
          <input
            type="text"
            name="PAN"
            id="PAN"
            placeholder="AABCD1234E"
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          />
        </div>
        <div className="w-[45%] h-16 mt-7 ">
          <input
            type="file"
            name="file"
            id="file"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]"
          />
          <label
            className="text-[white] bg-[black] inline-block cursor-pointer focus:bg-red hover:bg-red"
            for="file"
          >
            <div className="flex h-full items-center gap-4">
              <div className="bg-bluegrey rounded-full h-16 w-16 flex justify-center items-center">
                <AddAPhoto sx={{ fontSize: 40, color: "#000000" }} />
              </div>{" "}
              <p className="font-bold text-lg">PAN Card</p>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[45%] my-3">
          <label htmlFor="regno" className="font-bold text-lg">
            Registeration Number
          </label>
          <input
            type="text"
            name="regno"
            id="regno"
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          />
        </div>
        <div className="w-[45%] h-16 mt-7 ">
          <input
            type="file"
            name="file"
            id="file"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]"
          />
          <label
            className="text-[white] bg-[black] inline-block cursor-pointer focus:bg-red hover:bg-red"
            for="file"
          >
            <div className="flex h-full items-center gap-4">
              <div className="bg-bluegrey rounded-full h-16 w-16 flex justify-center items-center">
                <AddAPhoto sx={{ fontSize: 40, color: "#000000" }} />
              </div>{" "}
              <p className="font-bold text-lg">Registeration Certificate</p>
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
        />
      </div>
    </div>
  );
}

export default VerifcationDetailsForm;
