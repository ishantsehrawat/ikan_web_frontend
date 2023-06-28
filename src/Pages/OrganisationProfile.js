import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import {
  CalendarMonth,
  CalendarMonthOutlined,
  Facebook,
  Instagram,
  LinkedIn,
  EditCalendarOutlined,
  Twitter,
  YouTube,
} from "@mui/icons-material";

import { EventTileProfile, Footer, Navbar } from "../components";
import { auth, db } from "../firebase-config";
import { organisationPlaceholder } from "../images";

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#000",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#000",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#000",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="w-full h-full flex justify-center">{children}</div>
      )}
    </div>
  );
}

function OrganisationProfile() {
  const [orgData, setOrgData] = useState({});
  const [value, setValue] = React.useState(0);
  const { oid } = useParams();

  const user = auth.currentUser;

  useEffect(() => {
    const orgRef = doc(db, "organisations", oid);
    const getOrg = async () => {
      const snapshots = await getDoc(orgRef);
      const docs = snapshots.data();
      setOrgData(docs);
    };

    getOrg();
  }, [oid]);

  console.log(orgData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader h-1/2 w-full p-4 md:p-10">
        <Navbar Page="events" />
        <div className="mt-60 ml-5"></div>
      </div>

      <div className="w-full h-full flex justify-center mb-20">
        {/* inner box */}
        <div className="w-[370px] md:w-[1100px] h-full bg-cgrey -mt-32 rounded-lg">
          {/* top box */}
          <div className="w-full hidden md:block">
            <div className=" w-full h-60 flex flex-col md:flex-row justify-between py-10 px-20 gap-20">
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
                  <h1 className="text-2xl font-bold">
                    {orgData?.BasicInfo?.name}
                  </h1>

                  <div className="flex gap-3">
                    <a
                      href={`https://facebook.com/${orgData?.ContactDetails?.fb}`}
                      target="_blank"
                      rel="noreferrer"
                      className={orgData?.ContactDetails?.fb ? "" : "hidden"}
                    >
                      <Facebook />
                    </a>
                    <a
                      href={`https://instagram.com/${orgData?.ContactDetails?.ig}`}
                      target="_blank"
                      rel="noreferrer"
                      className={orgData?.ContactDetails?.ig ? "" : "hidden"}
                    >
                      <Instagram />
                    </a>
                    <a
                      href={`https://twitter.com/${orgData?.ContactDetails?.tw}`}
                      target="_blank"
                      rel="noreferrer"
                      className={orgData?.ContactDetails?.tw ? "" : "hidden"}
                    >
                      <Twitter />
                    </a>
                    <a
                      href={`https://linkedin.com/in/${orgData?.ContactDetails?.ln}`}
                      target="_blank"
                      rel="noreferrer"
                      className={orgData?.ContactDetails?.ln ? "" : "hidden"}
                    >
                      <LinkedIn />
                    </a>
                    <a
                      href={`https://youtube.com/${orgData?.ContactDetails?.yt}`}
                      target="_blank"
                      rel="noreferrer"
                      className={orgData?.ContactDetails?.yt ? "" : "hidden"}
                    >
                      <YouTube />
                    </a>
                  </div>
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
                    href={`../../${orgData?.ContactDetails?.website}`}
                    className="text-saffron"
                  >
                    {orgData?.ContactDetails?.website}
                  </a>
                  {orgData?.POC?.email === user?.email ? (
                    <a
                      className={
                        "h-8 w-max md:px-8  text-sm bg-black text-white rounded-lg md:rounded flex justify-center items-center"
                      }
                      href="/organisation-join"
                    >
                      Edit
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full block md:hidden p-5">
            {/* 1st row */}
            <div className="flex gap-6">
              <img
                className="rounded-full w-20 h-20"
                src={
                  orgData?.BasicInfo?.logo
                    ? orgData?.BasicInfo?.logo
                    : organisationPlaceholder
                }
                alt="No logo"
              />
              <div className="flex flex-col gap-2 w-full">
                <p className="text-xl font-bold">{orgData?.BasicInfo?.name}</p>
                {orgData?.POC?.email === user?.email ? (
                  <a
                    className={
                      "h-8 w-full px-0 md:px-8  text-sm bg-black text-white rounded-lg md:rounded flex justify-center items-center"
                    }
                    href="/organisation-join"
                  >
                    Edit Profile
                  </a>
                ) : null}
              </div>
            </div>

            {/* 2nd row */}
            <div className="flex flex-col pt-2 gap1">
              <p className="text-sm font-bold">{orgData?.POC?.name}</p>
              <p className="text-xs">
                <span className="font-bold">Darpan ID:</span>
                {orgData?.VerificationDetails?.DarpanID}
              </p>
              <p className="text-xs">
                <span className="font-bold">Reg. Number</span>
                {orgData?.VerificationDetails?.RegisterationNumber}
              </p>
              <p className="text-xs">{orgData?.BasicInfo?.mission}</p>
              <a
                href={`${orgData?.ContactDetails?.website}`}
                className="text-sm text-saffron font-bold"
              >
                {orgData?.ContactDetails?.website}
              </a>
            </div>
          </div>
          {/* 3rd row */}
          <div className="block md:hidden">
            <hr className="" />
            <div className="flex w-full justify-between font-sm">
              <div className="w-[30%] flex flex-col justify-center items-center h-16">
                <p className="font-bold">
                  {orgData?.events ? orgData?.events?.length : 0}
                </p>
                <p className="text-gray-600 -mt-2 font-semibold">Events</p>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center h-16">
                <p className="font-bold">
                  {orgData?.MemberInfo?.newMembers
                    ? orgData?.MemberInfo?.newMembers.length
                    : 0}
                </p>
                <p className="text-gray-600 -mt-2 font-semibold">Members</p>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center h-16">
                <p className="font-bold">
                  {orgData?.RatingInfo?.rating
                    ? orgData?.RatingInfo?.rating
                    : 0}
                </p>
                <p className="text-gray-600 -mt-2 font-semibold">Rating</p>
              </div>
            </div>
          </div>

          {/* tabs */}
          <hr className="w-full border-t-2 -mb-0.5" />
          <AntTabs
            TabIndicatorProps={{
              sx: {
                top: "0",
              },
            }}
            centered
            className="!hidden md:!block"
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab
              icon={<CalendarMonthOutlined className=" !m-0 !h-5" />}
              className="!hidden md:!block !p-0 !mx-5 !h-5"
              iconPosition="start"
              label="Ongoing Events"
            />
            <AntTab
              icon={<CalendarMonth className=" !m-0 !h-5" />}
              className="!hidden md:!block !p-0 !mx-5 !h-5"
              iconPosition="start"
              label="Completed Events"
            />
            {orgData?.POC?.email === user?.email ? (
              <AntTab
                icon={<EditCalendarOutlined className=" !m-0 !h-5" />}
                className="!hidden md:!block !p-0 !mx-5 !h-5"
                iconPosition="start"
                label="Add Event"
                onClick={() => {
                  window.location.href = `/add-event`;
                }}
              />
            ) : null}
          </AntTabs>
          <AntTabs
            TabIndicatorProps={{
              sx: {
                top: "0",
              },
            }}
            centered
            className="!block md:!hidden"
            value={value}
            onChange={handleChange}
            aria-label="ant example"
            variant="fullWidth"
          >
            <AntTab
              icon={<CalendarMonthOutlined className=" !m-0 !h-5" />}
              className="!block md:!hidden !p-0 !mx-5 !h-5"
              iconPosition="start"
            />{" "}
            <AntTab
              icon={<CalendarMonth className=" !m-0 !h-5" />}
              className="!block md:!hidden !p-0 !mx-5 !h-5"
              iconPosition="start"
            />{" "}
            {orgData?.POC?.email === user?.email ? (
              <AntTab
                icon={<EditCalendarOutlined className=" !m-0 !h-5" />}
                className="!block md:!hidden !p-0 !mx-5 !h-5"
                iconPosition="start"
                onClick={() => {
                  window.location.href = `/add-event`;
                }}
              />
            ) : null}
          </AntTabs>
          <TabPanel value={value} index={0}>
            <div className="flex w-full gap-6 flex-wrap px-[10px] md:px-[0.5px]">
              {orgData?.events?.map((event) => {
                return <EventTileProfile eid={event} timeline="future" />;
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="flex w-full gap-6 flex-wrap px-[10px] md:px-[0.5px]">
              {orgData?.events?.map((event) => {
                return <EventTileProfile eid={event} timeline="past" />;
              })}
            </div>
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            Item Three
          </TabPanel> */}
        </div>
      </div>

      <Footer Page="notfound" />
    </div>
  );
}

export default OrganisationProfile;
