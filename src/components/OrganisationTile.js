import {
  CalendarTodayOutlined,
  Check,
  CloseOutlined,
  LocationOnOutlined,
  PersonOutlineOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import React from "react";
import { organisationPlaceholder } from "../images";

const OrganisationTile = ({ orgData, user }) => {
  return (
    <div>
      <div className="hidden md:block">
        <div className="md:w-[1100px] bg-white rounded-xl h-60 flex flex-col md:flex-row justify-between py-10 px-20 gap-20">
          <img
            src={
              orgData?.BasicInfo?.logo
                ? orgData?.BasicInfo?.logo
                : organisationPlaceholder
            }
            alt=""
            className="w-40 h-40 rounded-full"
          />

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
                  {orgData?.RatingInfo?.rating
                    ? orgData?.RatingInfo?.rating
                    : 0}
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
      </div>

      {/* mobile card */}
      <div className="block md:hidden">
        <div className="w-[350px] flex flex-col bg-white rounded-lg p-3">
          {/* top part */}
          <div className="flex gap-4 py-2">
            <img
              src={
                orgData?.BasicInfo?.logo
                  ? orgData?.BasicInfo?.logo
                  : organisationPlaceholder
              }
              alt=""
              className="w-[140px] h-[140px] rounded-xl"
            />

            <div className="text-sm flex flex-col h-[140px] justify-between">
              <div>
                <p className="text-xl font-bold">{orgData?.BasicInfo?.name}</p>
                <p className="text-gray-500 -mt-1 text-xs">
                  <LocationOnOutlined sx={{ fontSize: 12 }} />{" "}
                  {orgData?.BasicInfo?.City}, {orgData?.BasicInfo?.State}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Darpan ID:</span>{" "}
                  {orgData?.VerificationDetails?.DarpanID}
                </p>
                <p>
                  <span className="font-semibold">Reg Number: </span>{" "}
                  {orgData?.VerificationDetails?.RegisterationNumber}
                </p>
              </div>
              <div className="flex w-full justify-between text-saffron">
                <div className="flex justify-center items-center gap-2">
                  <CalendarTodayOutlined sx={{ fontSize: 17 }} />{" "}
                  {orgData?.events?.length}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <PersonOutlineOutlined sx={{ fontSize: 20 }} />{" "}
                  {orgData?.MemberInfo?.newMembers?.length}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <StarBorderOutlined sx={{ fontSize: 20 }} />{" "}
                  {orgData?.RatingInfo?.rating
                    ? orgData?.RatingInfo?.rating
                    : 0}
                </div>
              </div>
            </div>
          </div>
          <p className="bg-gray-600 text-white w-max px-2 rounded">
            {orgData?.BasicInfo?.scale} scale
          </p>
          <p>{orgData?.BasicInfo?.mission}</p>
          <div className="flex w-full justify-between pt-1">
            <div className="flex gap-2">
              <button className="bg-[#019592] text-white rounded-lg w-16 px-2 h-8">
                <Check />
              </button>
              <button className="bg-[#B00020] text-white rounded-lg w-16 px-2 h-8">
                <CloseOutlined />
              </button>
            </div>
            <a
              className={
                "h-8 w-max px-4 text-sm bg-white border-black border-2 text-black rounded-lg md:rounded flex justify-center items-center"
              }
              href={`/organisation-profile/${orgData?.POC?.email}`}
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationTile;
