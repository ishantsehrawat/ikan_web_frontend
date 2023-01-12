import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import {useNavigate} from 'react-router-dom';

import { Navbar, Footer } from "../components";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
  const [userData, setUserData] = useState({});
  const user = auth.currentUser;
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.removeItem("token");
        navigate('/');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

useEffect(() => {
  ;(async () => {
    // e.preventDefault();
    const colRef = doc(db, 'users', user?.email);
    const snapshots = await getDoc(colRef);
    const docs = snapshots.data()
    setUserData(docs);
  })()
}, [user])

// useEffect(() => {
    const editUser = async () => {
       await updateDoc(doc(db,'users',user?.email),userData);
      const newUser = await getDoc(doc(db, 'users', user?.email)).data();
    
      setUserData(newUser)
      console.log(newUser);
      return newUser;
    };
  
// }, [user])


console.log(userData)

  return (
    <div className="bg-cgrey">
      <div className=" bg-lightsaffron h-[50vh] w-full p-10">
        <Navbar Page="profile" />
        <div className="mt-28 ml-5"></div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex">
          <img
            src={userData?.photo}
            alt="profile"
            className="w-48 h-48 rounded-full border-4 border-black object-cover  ml-20 -translate-y-1/2"
          />
          <p className="text-5xl font-semibold ml-10 mt-5">{userData?.name}</p>
        </div>
        <button
          onClick={logout}
          className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
        >
          Log Out
        </button>
      </div>
      <div className="flex flex-col items-center">
        <form className="flex flex-col w-[900px]">
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              NAME
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              defaultValue={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              EMAIL
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              defaultValue={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              PHONE NO.
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              defaultValue={userData?.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              INSTAGRAM
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              defaultValue={userData?.ig}
              onChange={(e) => setUserData({ ...userData, ig: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              TWITTER
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              defaultValue={userData?.tw}
              onChange={(e) => setUserData({ ...userData, tw: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-start">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              ABOUT
            </span>
            {/* <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="evasanssteve@gmail.com"
              // onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            /> */}
            <textarea
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-52"
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
          className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
        >
          Edit
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
