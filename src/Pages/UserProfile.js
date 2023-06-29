import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  capitalize,
  styled,
} from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import {
  CalendarMonthOutlined,
  Instagram,
  Twitter,
  FavoriteBorder,
  EventRepeatOutlined,
  LinkOutlined,
  FileCopy,
  Save,
  Print,
  Share,
  Mail,
  Verified,
  BusinessCenter,
  Person,
} from "@mui/icons-material";
import { signOut } from "firebase/auth";

import { EventTileProfile, Footer, Navbar } from "../components";
import { auth, db } from "../firebase-config";

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

function generateRandomHexCode() {
  const letters = "0123456789ABCDEF";
  const shades = {
    orange: ["FF", "EE", "DD", "CC", "BB", "AA"],
    gray: ["99", "88", "77", "66", "55", "44"],
  };

  const colors = Object.keys(shades);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomShade = shades[randomColor];

  const randomIndex = Math.floor(Math.random() * randomShade.length);
  const shade = randomShade[randomIndex];

  let hexCode = "#" + shade;

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    hexCode += letters[randomIndex];
  }

  return hexCode;
}

function UserProfile() {
  const { uid } = useParams();

  const [orgData, setOrgData] = useState({});
  const [userData, setUserData] = useState({});
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [randomBG, setRandomBG] = useState();

  const open = Boolean(anchorEl);
  const date = new Date();
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    setRandomBG(generateRandomHexCode);
  }, []);

  useEffect(() => {
    const orgRef = doc(db, "organisations", uid);
    const getOrg = async () => {
      const snapshots = await getDoc(orgRef);
      const docs = snapshots.data();
      setOrgData(docs);
    };

    getOrg();
    const userRef = doc(db, "users", uid);
    const getUser = async () => {
      const snapshots = await getDoc(userRef);
      const docs = snapshots.data();
      setUserData(docs);
    };

    getUser();
  }, [uid]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const actions = [
    { icon: <FileCopy />, name: "Copy" },
    { icon: <Save />, name: "Save" },
    { icon: <Print />, name: "Print" },
    { icon: <Share />, name: "Share" },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await signOut(auth).then(() => {
      console.log("sign out successful");
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader h-1/2 w-full p-4 md:p-10">
        <Navbar Page="profile" />
        <div className="mt-60 ml-5"></div>
      </div>

      <div className="w-full h-full flex justify-center mb-20">
        {/* inner box */}
        <div className="w-[370px] md:w-[1100px] h-full bg-cgrey -mt-32 rounded-lg">
          {/* top box */}
          <div className="w-full hidden md:block">
            <div className=" w-full h-[300px] flex flex-col md:flex-row justify-between py-10 px-20 gap-20">
              {!userData?.photo ? (
                <Avatar
                  className="!w-40 !h-40 !rounded-full !text-6xl md:!text-8xl !font-bold"
                  sx={{ bgcolor: randomBG }}
                >
                  {userData?.email?.charAt(0)
                    ? capitalize(userData?.email?.charAt(0))
                    : null}
                </Avatar>
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src={user?.photoURL}
                  className="!w-40 !h-40 !rounded-full"
                />
              )}

              {/* details */}
              <div className="w-full h-full flex flex-col justify-between">
                {/* 1st row */}
                <div className="flex w-full justify-between">
                  <div className="">
                    <h1 className="text-2xl font-bold">{userData?.name}</h1>
                    <div className="flex gap-5 text-gray-500 text-sm">
                      <p className="">
                        <Person sx={{ fontSize: 16 }} /> {userData?.pronouns}
                      </p>
                      <p>
                        <BusinessCenter
                          sx={{ fontSize: 15 }}
                          className="-mt-0.5"
                        />{" "}
                        {userData?.profession}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`https://instagram.com/${userData?.ig}`}
                      target="_blank"
                      rel="noreferrer"
                      className={userData?.ig ? "" : "hidden"}
                    >
                      <Instagram />
                    </a>
                    <a
                      href={`https://twitter.com/${userData?.tw}`}
                      target="_blank"
                      rel="noreferrer"
                      className={userData?.tw ? "" : "hidden"}
                    >
                      <Twitter />
                    </a>
                  </div>
                </div>

                {/* 2nd row */}
                <div className="w-full flex gap-10">
                  <div className="flex flex-row gap-2">
                    <p className="font-bold">
                      {userData?.events ? userData?.events?.length : 0}
                    </p>
                    <p>Events</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="font-bold">
                      {userData?.eventsliked ? userData?.eventsliked.length : 0}
                    </p>
                    <p>Liked</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="font-bold">
                      {userData?.dob
                        ? date.getFullYear() -
                          Number(userData?.dob?.split("-")[0])
                        : null}
                    </p>
                    <p>years</p>
                  </div>
                </div>

                {/* 4th row */}
                <p className="">{userData?.about}</p>

                {/* 5th row */}
                <div className="flex gap-1 items-center">
                  {userData?.interests?.map((interest, id) => (
                    <p
                      className="bg-[#474A57] text-white px-4 py-1 text-xs h-max rounded-lg"
                      key={id}
                    >
                      {interest.label}
                    </p>
                  ))}
                </div>

                {/* 6th row */}
                <div className="flex justify-between gap-16">
                  <a
                    href={`/organisation-profile/${orgData?.POC?.email}`}
                    className=" text-saffron font-bold"
                  >
                    {orgData?.BasicInfo?.name}{" "}
                    {orgData?.isVerified === true ? <Verified /> : null}
                  </a>
                  <div className="flex gap-1">
                    {userData?.email === user?.email ? (
                      <a
                        className={
                          "h-8 w-[100px] text-sm bg-black text-white rounded-lg md:rounded flex justify-center items-center"
                        }
                        href="/edit-profile"
                      >
                        Edit
                      </a>
                    ) : null}
                    {userData?.email === user?.email ? (
                      <button
                        onClick={logout}
                        className={
                          "h-8 w-[100px] px-0 text-sm bg-white text-black border-2 border-black rounded-lg md:rounded flex justify-center items-center"
                        }
                      >
                        Log Out
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full block md:hidden p-5">
            {/* 1st row */}
            <div className="flex gap-6">
              {!userData?.photo ? (
                <Avatar
                  className="!w-20 !h-20 !rounded-full !text-6xl md:!text-6xl !font-semibold"
                  sx={{ bgcolor: randomBG }}
                >
                  {userData?.email?.charAt(0)
                    ? capitalize(userData?.email?.charAt(0))
                    : null}
                </Avatar>
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src={user?.photoURL}
                  className="!w-20 !h-20 !rounded-full"
                />
              )}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex w-full justify-between">
                  <Tooltip title={`${userData?.name}`} placement="top" arrow>
                    <p className="text-xl font-bold max-w-[170px] truncate">
                      {userData?.name}
                    </p>
                  </Tooltip>
                  <button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="bg-black text-white h-8 w-12 rounded-full"
                  >
                    <LinkOutlined sx={{ fontSize: 18 }} />
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    {userData?.ig ? (
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          window.location.replace(
                            `https://www.instagram.com/${userData?.ig}/`
                          );
                        }}
                      >
                        <Instagram fontSize="small" /> {userData?.ig}
                      </MenuItem>
                    ) : null}
                    {userData?.tw ? (
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          window.location.replace(
                            `https://twitter.com/${userData?.tw}`
                          );
                        }}
                      >
                        <Twitter fontSize="small" /> {userData?.tw}
                      </MenuItem>
                    ) : null}
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        window.location.replace(`mailto:${userData?.email}`);
                      }}
                    >
                      <Mail fontSize="small" />
                      {userData?.email}
                    </MenuItem>
                  </Menu>
                </div>
                <div className="flex gap-5 text-gray-500 text-xs -mt-2">
                  <p className="">
                    <Person sx={{ fontSize: 16 }} /> {userData?.pronouns}
                  </p>
                  <p>
                    <BusinessCenter sx={{ fontSize: 15 }} className="-mt-0.5" />{" "}
                    {userData?.profession}
                  </p>
                </div>
                <div className="flex gap-1">
                  {userData?.email === user?.email ? (
                    <a
                      className={
                        "h-8 w-full px-0 md:px-8  text-sm bg-black text-white rounded-lg md:rounded flex justify-center items-center"
                      }
                      href="/edit-profile"
                    >
                      Edit
                    </a>
                  ) : null}
                  {userData?.email === user?.email ? (
                    <button
                      onClick={logout}
                      className={
                        "h-8 w-full px-0 md:px-8  text-sm bg-white text-black border-2 border-black rounded-lg md:rounded flex justify-center items-center"
                      }
                    >
                      Log Out
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* 2nd row */}
            <div className="flex flex-col pt-2 gap1">
              <p className="text-sm">{userData?.about}</p>
              <div className="flex flex-wrap gap-1 items-center py-2">
                {userData?.interests?.map((interest, id) => (
                  <p
                    className="bg-[#474A57] text-white px-4 py-1 text-2xs h-max rounded-md"
                    key={id}
                  >
                    {interest.label}
                  </p>
                ))}
              </div>
              <a
                href={`/organisation-profile/${orgData?.POC?.email}`}
                className="text-sm text-saffron font-bold"
              >
                {orgData?.BasicInfo?.name}{" "}
                {orgData?.isVerified === true ? (
                  <Verified className="-mt-0.5" sx={{ fontSize: 17 }} />
                ) : null}
              </a>
            </div>
          </div>

          {/* 3rd row */}
          <div className="block md:hidden">
            <hr className="" />
            <div className="flex w-full justify-between font-sm">
              <div className="w-[30%] flex flex-col justify-center items-center h-16">
                <p className="font-bold">
                  {userData?.events ? userData?.events?.length : 0}
                </p>
                <p className="text-gray-600 -mt-2 font-semibold">Events</p>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center h-16">
                <p className="font-bold">
                  {userData?.eventsliked ? userData?.eventsliked.length : 0}
                </p>
                <p className="text-gray-600 -mt-2 font-semibold">Liked</p>
              </div>
              <div className="w-[30%] flex flex-col justify-center items-center h-16">
                <p className="font-bold">
                  {userData?.dob
                    ? date.getFullYear() - Number(userData?.dob?.split("-")[0])
                    : null}
                </p>
                <p className="text-gray-600 -mt-2 font-semibold">Years</p>
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
              label="Events"
            />
            <AntTab
              icon={<FavoriteBorder className=" !m-0 !h-5" />}
              className="!hidden md:!block !p-0 !mx-5 !h-5"
              iconPosition="start"
              label="Liked Events"
            />
            <AntTab
              icon={<EventRepeatOutlined className=" !m-0 !h-5" />}
              className="!hidden md:!block !p-0 !mx-5 !h-5"
              iconPosition="start"
              label="Past Events"
            />
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
              icon={<FavoriteBorder className=" !m-0 !h-5" />}
              className="!block md:!hidden !p-0 !mx-5 !h-5"
              iconPosition="start"
            />{" "}
            <AntTab
              icon={<EventRepeatOutlined className=" !m-0 !h-5" />}
              className="!block md:!hidden !p-0 !mx-5 !h-5"
              iconPosition="start"
            />
          </AntTabs>

          <TabPanel value={value} index={0}>
            <div className="flex w-full gap-6 flex-wrap px-[10px] md:px-[0.5px]">
              {userData?.events?.map((event) => {
                return <EventTileProfile eid={event} timeline="future" />;
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="flex w-full gap-6 flex-wrap px-[10px] md:px-[0.5px]">
              {userData?.eventsliked?.map((event) => {
                return <EventTileProfile eid={event} />;
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="flex w-full gap-6 flex-wrap px-[10px] md:px-[0.5px]">
              {userData?.events?.map((event) => {
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

export default UserProfile;
