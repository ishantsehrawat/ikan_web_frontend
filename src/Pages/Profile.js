import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDocs,collection,doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Navbar, Footer, EventTile } from "../components";

function Profile() {
  const [userData, setUserData] = useState({});
  const [eventData,setEventData] = useState([]);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  console.log(userData);

  useEffect(() => {
    const colRef = doc(db, "users", String(user?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setUserData(docs);
    }

    getUser();
  }, [user])
  useEffect(() => {
    const getAllEvents = async () => {
      const data = await getDocs(collection(db, "events"));
      // const querySnapshot = await getDocs(query(collection(db, "event"), where("name", "==", "Daaru Donation")));
      // setQueryData(querySnapshot.docs.map((doc)=>({...doc.data()})))
      setEventData(data.docs.map((doc) => ({ ...doc.data()})));
    };
    getAllEvents();
    
}, []);
  async function editUser() {
    await updateDoc(doc(db, "users", user?.email), userData).then(() => {
      window.alert("User Updated Successfully");
    });
  }
  return (
    <div className="bg-cgrey">
      <div className=" bg-profileHeader h-[50vh] w-full p-10">
        <Navbar Page="profile" />
        <div className="mt-28 ml-5"></div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex">
          {!user?.photoURL ? (
            <div></div>
          ) : (
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-48 h-48 rounded-full border-4 border-black object-cover  ml-20 -translate-y-1/2"
            />
          )}

          <p className="text-5xl font-semibold ml-10 mt-5">{userData?.name}</p>
        </div>
        <button
          onClick={logout}
          className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black transition duration-500 hover:bg-white hover:text-black hover:b-2"
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
          className="h-12 my-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
        >
          Save
        </button>
      </div>
      <div className={(userData?.type === "organisation") ? "" : "hidden"}>
      {eventData?.map((event) =>{
                if(event?.host===user?.email){
                return (
                <EventTile key={event?.name}
                image={event?.img}
                title={event?.name}
                organisation={event?.host}
                location={event?.Country+", "+event?.State+", "+event?.City}
                date={event?.date}
                description={event?.description}
                type={event?.type}
                />
              )}})}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
