import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Navbar, Footer, EventList } from "../components";
import { Avatar, capitalize } from "@mui/material";

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

const options = [
  {
    value: "Education and Tutoring",
    label: "Education and Tutoring",
  },
  {
    value: "Environmental Conservation",
    label: "Environmental Conservation",
  },
  { value: "Animal Welfare", label: "Animal Welfare" },
  {
    value: "Community Development",
    label: "Community Development",
  },
  {
    value: "Healthcare and Medical Support",
    label: "Healthcare and Medical Support",
  },
  { value: "Hunger Relief", label: "Hunger Relief" },
  { value: "Arts and Culture", label: "Arts and Culture" },
  { value: "Youth Empowerment", label: "Youth Empowerment" },
  { value: "Elderly Care", label: "Elderly Care" },
  { value: "Disaster Relief", label: "Disaster Relief" },
  { value: "Gender Equality", label: "Gender Equality" },
  { value: "LGBTQ+ Rights", label: "LGBTQ+ Rights" },
  {
    value: "Human Rights Advocacy",
    label: "Human Rights Advocacy",
  },
  {
    value: "Homelessness and Housing",
    label: "Homelessness and Housing",
  },
  { value: "Poverty Alleviation", label: "Poverty Alleviation" },
  {
    value: "Mental Health Support",
    label: "Mental Health Support",
  },
  {
    value: "Technology and Digital Literacy",
    label: "Technology and Digital Literacy",
  },
  {
    value: "Sports and Recreation",
    label: "Sports and Recreation",
  },
  { value: "International Aid", label: "International Aid" },
  { value: "Other", label: "Other (with an option to specify)" },
];

function Profile() {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [randomBG, setRandomBG] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setRandomBG(generateRandomHexCode);
  }, [generateRandomHexCode]);

  useEffect(() => {
    // Set the default selected options based on userData.interests
    if (userData?.interests && userData.interests.length > 0) {
      const defaultOptions = options.filter((option) =>
        userData.interests.some((interest) => interest.value === option.value)
      );
      setSelectedOptions(defaultOptions);
    }
  }, [userData]);

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length > 3) {
      selectedOptions = selectedOptions.slice(0, 3);
    }
    setInterests(selectedOptions);
    setUserData({ ...userData, interests: [...selectedOptions] });
  };

  // getting user data on page load
  useEffect(() => {
    const user = auth.currentUser;
    setUser(user);
  }, []);

  useEffect(() => {
    const colRef = doc(db, "users", String(user?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setUserData(docs);
    };

    getUser();
  }, [user]);

  // updating user data
  async function editUser() {
    await updateDoc(doc(db, "users", user?.email), userData).then(() => {
      window.alert("User Updated Successfully");
    });
  }
  return (
    <div className="bg-cgrey">
      <div className=" bg-profileHeader h-1/2 w-full p-4 md:p-10">
        <Navbar />
        <div className="mt-28 ml-5"></div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col md:flex-row ">
          {!userData?.photo ? (
            <Avatar
              className="!w-28 md:!w-48 !h-28 md:!h-48 !rounded-full !border-2 md:!border-4 !border-black !object-cover !ml-6 md:!ml-20 !-translate-y-1/2 !text-6xl md:!text-8xl !font-bold"
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
              className="!w-28 md:!w-48 !h-28 md:!h-48 !rounded-full !border-2 md:!border-4 !border-black !object-cover !ml-6 md:!ml-20 !-translate-y-1/2"
            />
          )}

          <p className="hidden md:block text-5xl font-semibold ml-10 mt-5">
            {userData?.name}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <form className="flex flex-col w-full md:w-[900px] px-10">
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              NAME
            </span>
            <input
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              type="text"
              defaultValue={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              EMAIL
            </span>
            <input
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              type="text"
              defaultValue={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              PHONE NO.
            </span>
            <input
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              type="text"
              defaultValue={userData?.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              DATE OF BIRTH
            </span>
            <input
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              type="date"
              defaultValue={userData?.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
            />
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              INSTAGRAM
            </span>
            <input
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              type="text"
              defaultValue={userData?.ig}
              onChange={(e) => setUserData({ ...userData, ig: e.target.value })}
            />
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              TWITTER
            </span>
            <input
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              type="text"
              defaultValue={userData?.tw}
              onChange={(e) => setUserData({ ...userData, tw: e.target.value })}
            />
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              PROFESSION
            </span>
            <select
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              name="profession"
              id="profession"
              value={userData?.profession}
              onChange={(e) =>
                setUserData({ ...userData, profession: e.target.value })
              }
            >
              <option value="">Select your profession</option>
              <option value="Student">Student</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Part-time worker">Part-time worker</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Intern">Intern</option>
            </select>
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              GENDER
            </span>
            <select
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              name="gender"
              id="gender"
              value={userData?.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other (with an option to specify)</option>
              <option value="Transgender male">Transgender male</option>
              <option value="Transgender female">Transgender female</option>
              <option value="Genderqueer">Genderqueer</option>
              <option value="Agender">Agender</option>
              <option value="Bigender">Bigender</option>
              <option value="Genderfluid">Genderfluid</option>
              <option value="Two-spirit">Two-spirit</option>
              <option value="Not listed">
                Not listed (with an option to specify)
              </option>
              <option value="Decline to answer">Decline to answer</option>
            </select>
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              PRONOUNS
            </span>
            <select
              className="rounded-lg px-4 w-full md:w-[600px] h-10"
              name="pronouns"
              id="pronouns"
              value={userData?.pronouns}
              onChange={(e) =>
                setUserData({ ...userData, pronouns: e.target.value })
              }
            >
              <option value="">Select your pronouns</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="Ze/Zir">Ze/Zir</option>
              <option value="Xe/Xem">Xe/Xem</option>
              <option value="Ve/Ver">Ve/Ver</option>
              <option value="Ey/Em">Ey/Em</option>
              <option value="Per/Per">Per/Per</option>
              <option value="Ze/Hir">Ze/Hir</option>
              <option value="Other">Other (with an option to specify)</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-start">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              ABOUT
            </span>
            <textarea
              className="rounded-lg p-4 w-full md:w-[600px] h-52"
              name="message"
              defaultValue={userData?.about}
              onChange={(e) =>
                setUserData({ ...userData, about: e.target.value })
              }
            />
          </label>

          <label className="mt-2 md:mt-5 mb-4 md:mb-0 w-full flex flex-col md:flex-row md:justify-end items-start md:items-center">
            <span className="md:pl-4 md:mr-40 font-bold md:font-normal text-lg pb-1 md:w-[200px] flex justify-start md:justify-end">
              INTERESTS
            </span>
            <Select
              name="interests"
              id="interests"
              value={interests}
              onChange={handleChange}
              placeholder="Select your interests"
              isMulti
              value={selectedOptions}
              className="rounded-lg w-full md:w-[600px]"
              options={[
                {
                  value: "Education and Tutoring",
                  label: "Education and Tutoring",
                },
                {
                  value: "Environmental Conservation",
                  label: "Environmental Conservation",
                },
                { value: "Animal Welfare", label: "Animal Welfare" },
                {
                  value: "Community Development",
                  label: "Community Development",
                },
                {
                  value: "Healthcare and Medical Support",
                  label: "Healthcare and Medical Support",
                },
                { value: "Hunger Relief", label: "Hunger Relief" },
                { value: "Arts and Culture", label: "Arts and Culture" },
                { value: "Youth Empowerment", label: "Youth Empowerment" },
                { value: "Elderly Care", label: "Elderly Care" },
                { value: "Disaster Relief", label: "Disaster Relief" },
                { value: "Gender Equality", label: "Gender Equality" },
                { value: "LGBTQ+ Rights", label: "LGBTQ+ Rights" },
                {
                  value: "Human Rights Advocacy",
                  label: "Human Rights Advocacy",
                },
                {
                  value: "Homelessness and Housing",
                  label: "Homelessness and Housing",
                },
                { value: "Poverty Alleviation", label: "Poverty Alleviation" },
                {
                  value: "Mental Health Support",
                  label: "Mental Health Support",
                },
                {
                  value: "Technology and Digital Literacy",
                  label: "Technology and Digital Literacy",
                },
                {
                  value: "Sports and Recreation",
                  label: "Sports and Recreation",
                },
                { value: "International Aid", label: "International Aid" },
                { value: "Other", label: "Other (with an option to specify)" },
              ]}
            />
          </label>
        </form>
        <button
          onClick={() => editUser()}
          className="h-12 mt-2 md:mt-5 md:mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
        >
          Edit
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
