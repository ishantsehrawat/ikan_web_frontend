import React from "react";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

const OrganisationTile = ({ orgData, user }) => {
  return (
    <div className="w-[1100px] bg-white rounded-xl h-60 flex flex-col md:flex-row justify-between py-10 px-20 gap-20">
      {orgData?.BasicInfo?.logo ? (
        <img
          src={orgData?.BasicInfo?.logo}
          alt=""
          className="w-40 h-40 rounded-full"
        />
      ) : null}

      {/* details */}
      <div className="w-full h-full flex flex-col justify-between">
        {/* 1st row */}
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold">{orgData?.BasicInfo?.name}</h1>

          <p className="text-sm text-gray-500">
            {orgData?.BasicInfo?.City}, {orgData?.BasicInfo?.State},{" "}
            {orgData?.BasicInfo?.Country}
          </p>
        </div>

        {/* 2nd row */}
        <div className="w-full flex gap-10">
          <div className="flex flex-row gap-2">
            <p className="font-bold">
              {orgData?.events ? orgData?.events?.length : 0}
            </p>
            <p>Events</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold">
              {orgData?.MemberInfo?.newMembers
                ? orgData?.MemberInfo?.newMembers.length
                : 0}
            </p>
            <p>Members</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold">
              {orgData?.RatingInfo?.rating ? orgData?.RatingInfo?.rating : 0}
            </p>
            <p>Rating</p>
          </div>
        </div>

        {/* 3rd row */}
        <div className="flex gap-16">
          <div className="flex flex-row gap-2">
            <p className="font-bold">Darpan ID:</p>
            <p>{orgData?.VerificationDetails?.DarpanID}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold">RegisterationNumber:</p>
            <p>{orgData?.VerificationDetails?.RegisterationNumber}</p>
          </div>
        </div>

        {/* 4th row */}
        <p>{orgData?.BasicInfo?.mission}</p>

        {/* 5th row */}
        <div className="flex justify-between gap-16">
          <a
            className={
              "h-8 w-max md:px-8  text-sm bg-black text-white rounded-lg md:rounded flex justify-center items-center"
            }
            href={`/organisation-profile/${orgData?.POC?.email}`}
          >
            View Details
          </a>

          {user?.type === "admin" ? (
            <div className="flex gap-4 text-white">
              <button className="h-8 w-max md:px-8  text-sm bg-[#019592] text-green rounded-lg md:rounded flex justify-center items-center">
                ACCEPT
              </button>
              <button className="h-8 w-max md:px-8  text-sm bg-[#B00020] text-red rounded-lg md:rounded flex justify-center items-center">
                DECLINE
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrganisationTile;
