import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, uploadTask, uploadBytesResumable } from "firebase/storage";

import { auth, db, storage } from "../firebase-config";
import { Navbar, Footer, OverlayBackground } from "../components"
import { country, state, city } from "../Data/Location";

function AddEvent() {
    const [countryid, setcountryid] = useState("101");
    const [stateid, setstateid] = useState("10");
    const [perc, setPerc] = useState(0)
    const [file, setFile] = useState("");
    const [userData, setUserData] = useState({});
    const [eventData, setEventData] = useState({
        Country:"India",
        State:"Delhi",
        City:"New Delhi",
        type:"1"
    });
    const user = auth.currentUser;

    const st = state.filter((st) => st.country_id === countryid);
    const ct = city.filter((ct) => ct.state_id === stateid);

    useEffect(() => {
        const colRef = doc(db, "users", String(user?.email));
        const getUser = async () => {
            const snapshots = await getDoc(colRef);
            const docs = snapshots.data();
            setUserData(docs);
        }

        getUser();
    }, [user]);

    // useEffect(()=>{
    //     const uploadFile = () => {
    //         const name = file.name + new Date().getTime();
    //         const storageRef = ref(storage, name);
    //         // const uploadTask = uploadBytesResumable(storageRef, file);
    //         uploadBytes(storageRef, file).then((snapshot) => {
    //             console.log('Uploaded a blob or file!');
    //         });
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 setEventData((prev) => ({ ...prev, img: downloadURL }));
    //             });
    //         }
    //     };
    //     file && uploadFile();
    // },[file])

    useEffect(() => {
        const uploadFile = () => {
            const name = file.name + new Date().getTime();
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log("Upload is " + progress + "% done");
                    setPerc(progress);
                    // switch (snapshot.state) {
                    //     case "paused":
                    //         console.log("Upload is paused");
                    //         break;
                    //     case "running":
                    //         console.log("Upload is running");
                    //         break;
                    //     default:
                    //         break;
                    // }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setEventData((prev) => ({ ...prev, img: downloadURL }));
                        window.alert("Image Uploaded")
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);
        
    console.log(perc);
    const eventRef = collection(db, "events");

    // console.log(user);
    const addEvent = async () => {
        const eid = eventData.name + "@" + new Date().getTime();
        setEventData((prev) => ({ ...prev, host: user?.email }));
        setEventData((prev) => ({ ...prev, eid: eid }));
        // const upload = uploadFile();
        // console.log(upload)

        await setDoc(doc(eventRef, eid), eventData).then(() => {
            window.alert("Event Added Successfully");
        }).catch((err) => {
            console.log(err.message);
        })
    }

    console.log(eventData);

    return (
        <div className="bg-cgrey">
            <div className="p-4 md:p-10">
                <Navbar />
            </div>
            {!(userData?.type === "organisation") ? 
            <div className="bg-white rounded-xl m-10 px-16 pt-20 pb-16 drop-shadow-lg flex flex-col justify-center items-center">
                <p>You are not authorised to add event, only verified organisations can add event</p>
                <a
                    href="/"
                    className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
                >
                    Go Back
                </a>
            </div> 
            :
            <div className="bg-white rounded-xl m-10 px-16 pt-20 pb-16 drop-shadow-lg flex flex-col justify-center items-center">
                <OverlayBackground Overlay={!(userData?.type === "organisation")} setBackButton={() => window.alert("You are not authorised to add event.\nOnly verified organisations can add events")} />
                <form className="flex flex-col gap-4 w-full">
                    <label className="flex flex-col gap-2">
                        <span className="text-textblue font-semibold text-lg">
                            Event Name:
                        </span>
                        <input className="border-2 rounded-lg p-4 h-10" type="text" onChange={(e) => { setEventData((prev) => ({ ...prev, name: e.target.value })) }} placeholder="Blanket Donation" />
                    </label>
                    <div className="flex justify-start flex-wrap gap-10">
                        <label className="flex flex-col gap-1">
                            <span className="text-textblue font-semibold text-lg">
                                Event Date:
                            </span>
                            <input className="border-2 rounded-lg p-4 h-10" type="date" onChange={(e) => { setEventData((prev) => ({ ...prev, date: e.target.value })) }} placeholder="" />
                        </label>
                        <label className="flex flex-col gap-1 w-full">
                            <span className="text-textblue font-semibold text-lg">
                                Event Pictures: 
                            </span>
                            <input className="border-2 rounded-lg h-10 w-full p-1" type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                    <label className="flex flex-col gap-1">
                        <span className="text-textblue font-semibold text-lg">
                            Event Description:
                        </span>
                        <textarea name="message" onChange={(e) => { setEventData((prev) => ({ ...prev, description: e.target.value })) }} className="border-2 rounded-lg p-4 w-full h-44" />
                    </label>
                    <div className="flex justify-start flex-wrap gap-10">
                        <label className="flex flex-col gap-1">
                            <span className="text-textblue font-semibold text-lg">
                                Number of Volunteers Required:
                            </span>
                            <input className="border-2 rounded-lg p-4 h-10" type="number" onChange={(e) => { setEventData((prev) => ({ ...prev, volreq: e.target.value })) }} placeholder="10" />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="text-textblue font-semibold text-lg">
                                Type:
                            </span>
                        <select
                            name="type"
                            className="border-2 rounded-lg px-4 h-10"
                            onChange={(e) => {
                                setEventData((prev) => ({ ...prev, type: e.target.value }))
                            }}
                        >
                            <option value="1">Food Distribution</option>
                            <option value="2">Plantation</option>
                            <option value="3">Education</option>
                            <option value="4">Health</option>
                            <option value="5">Animal Welfare</option>
                            <option value="6">Cleanliness</option>
                            <option value="7">Cloth Distribution</option>
                        </select>
                      </label>
                    </div>
                    <div className="flex justify-start flex-wrap gap-10">
                        {/* Country */}
                        <label className="flex flex-col gap-1 ">
                            <span className="text-textblue font-semibold text-lg">
                                Country:
                            </span>
                        <select
                          name="country"
                          className="border-2 rounded-lg px-4 h-10"
                          onChange={(e) => {
                              setcountryid(e.target.value);
                              setEventData((prev) => ({ ...prev, Country: e.target.options[e.target.selectedIndex].text }))
                            }}
                            >
                          <option value="">India</option>
                          {country.map((getcon, index) => (
                              <option key={index} value={getcon.country_id}>
                              {getcon.country_name}{" "}
                            </option>
                          ))}
                        </select>
                        </label>
                        {/* State */}
                        <label className="flex flex-col gap-1 ">
                            <span className="text-textblue font-semibold text-lg">
                                State:
                            </span>
                        <select
                          className="border-2 rounded-lg px-4 h-10"
                          name="state"
                          onChange={(e) => {
                              setstateid(e.target.value);
                              setEventData((prev) => ({ ...prev, State: e.target.options[e.target.selectedIndex].text }))
                            }}
                            >
                          <option value="">Delhi</option>
                          {st.map((getst, index) => (
                              <option key={index} value={getst.state_id}>
                              {getst.state_name}{" "}
                            </option>
                          ))}
                        </select>
                        </label>
                        {/* City */}
                        <label className="flex flex-col gap-1">
                            <span className="text-textblue font-semibold text-lg">
                                City:
                            </span>
                        <select
                          className="border-2 rounded-lg px-4 h-10"
                          name="city"
                          onChange={(e) => {
                            setEventData((prev) => ({ ...prev, City: e.target.options[e.target.selectedIndex].text }))
                          }}
                          >
                          <option value="">New Delhi</option>
                          {ct.map((gcity, index) => (
                              <option key={index} value={gcity.city_id}>
                              {" "}
                              {gcity.city_name}{" "}
                            </option>
                          ))}
                        </select>
                        </label>
                    </div>
                </form>
                <button
                    onClick={() => addEvent()}
                    className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
                >
                    Edit
                </button>
            </div>}
            <Footer />
            {/* Location Overlay
      <div className="h-full">
        <OverlayBackground Overlay={uLocation} setBackButton={setuLocation} />
        <Location
          uLocation={uLocation}
          setLocationName={setLocationName}
          setuLocation={setuLocation}
        />
      </div>

      {/* Date Overlay */}
      {/* <div>
        <OverlayBackground Overlay={uDate} setBackButton={setuDate} />
        <Date uDate={uDate} setDate={setDate} setuDate={setuDate} />
      </div> */}

      {/* Event Overlay */}
      {/* <div>
        <OverlayBackground Overlay={uEvent} setBackButton={setuEvent} />
        <EventOverlay
          uEvent={uEvent}
          eventType={eventType}
          setuEvent={setuEvent}
          setEventType={setEventType}
          setcheck={setcheck}
          check={check}
        />
      </div> */}
        </div>
    )
}

export default AddEvent