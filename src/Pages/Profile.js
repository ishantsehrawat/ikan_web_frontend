import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Navbar, Footer, EventList } from "../components";

function Profile() {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // getting user data on page load
  useEffect(() => {
    const user = auth.currentUser;
    setUser(user);
  }, []);

  // logout function
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // getting user data from firestore
  // console.log(userData);

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
        <Navbar Page="profile" />
        <div className="mt-28 ml-5"></div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col md:flex-row ">
          {!user?.photoURL ? (
            <div></div>
          ) : (
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-28 md:w-48 h-28 md:h-48 rounded-full border-2 md:border-4 border-black object-cover ml-6 md:ml-20 -translate-y-1/2"
            />
          )}

          <p className="hidden md:block text-5xl font-semibold ml-10 mt-5">
            {userData?.name}
          </p>
        </div>
        <button
          onClick={logout}
          className="h-10 md:h-12 w-auto md:w-36 mt-2 md:mt-5 mr-6 md:mr-12 px-6 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2"
        >
          Log Out
        </button>
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
        </form>
        <button
          onClick={() => editUser()}
          className="h-12 mt-2 md:mt-5 md:mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
        >
          Edit
        </button>
      </div>

      <EventList user={userData} setUser={setUserData} title="Your Events" />
      <EventList
        user={userData}
        setUser={setUserData}
        title="Your Liked Events"
      />

      {/* <EventList /> */}
      <Footer />
    </div>
  );
}

export default Profile;
