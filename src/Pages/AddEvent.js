import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "../firebase-config";
import { Navbar, Footer, OverlayBackground } from "../components"

function AddEvent() {
    const [file, setFile] = useState("");
    const [userData, setUserData] = useState({});
    const [eventData, setEventData] = useState({});
    const [perc, setPerc] = useState(0);
    const user = auth.currentUser;

    console.log(eventData)

    useEffect(() => {
        const colRef = doc(db, "users", String(user?.email));
        const getUser = async () => {
            const snapshots = await getDoc(colRef);
            const docs = snapshots.data();
            setUserData(docs);
        }

        getUser();
    }, [user]);


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
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);

    const eventRef = collection(db, "events");


    const addEvent = async () => {
        const eid = eventData.name + "@" + new Date().getTime();
        setEventData((prev) => ({ ...prev, eid: eid }));

        await setDoc(doc(eventRef, eid), eventData).then(() => {
            window.alert("Event Added Successfully");
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div className="bg-cgrey">
            <div className="p-4 md:p-10">
                <Navbar />
            </div>
            <div className="bg-white rounded-xl m-10 px-16 pt-20 pb-16 drop-shadow-lg flex flex-col justify-center items-center">
                <OverlayBackground Overlay={!(userData?.type === "organisation")} setBackButton={() => window.alert("You are not authorised to add event.\nOnly verified organisations can add events")} />
                <form className="flex flex-col gap-4 w-full">
                    <label className="flex flex-col gap-2">
                        <span className="text-textblue font-semibold text-lg">
                            Event Name:
                        </span>
                        <input className="border-2 rounded-lg p-4 h-10" type="text" onChange={(e) => { setEventData((prev) => ({ ...prev, name: e.target.value })) }} placeholder="Blanket Donation" />
                    </label>
                    <div className="flex justify-start">
                        <label className="flex flex-col gap-1">
                            <span className="text-textblue font-semibold text-lg">
                                Event Date:
                            </span>
                            <input className="border-2 rounded-lg p-4 h-10" type="date" onChange={(e) => { setEventData((prev) => ({ ...prev, date: e.target.value })) }} placeholder="" />
                        </label>
                        <label className="flex flex-col gap-1 ml-24 w-full">
                            <span className="text-textblue font-semibold text-lg">
                                Event Pictures: {perc}%
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
                    <div className="flex justify-start">
                        <label className="flex flex-col gap-1">
                            <span className="text-textblue font-semibold text-lg">
                                Number of Volunteers Required:
                            </span>
                            <input className="border-2 rounded-lg p-4 h-10" type="number" onChange={(e) => { setEventData((prev) => ({ ...prev, volreq: e.target.value })) }} placeholder="10" />
                        </label>
                        <label className="flex flex-col gap-1 ml-24 ">
                            <span className="text-textblue font-semibold text-lg">
                                Type:
                            </span>
                            <input className="border-2 rounded-lg p-4 h-10" type="" onChange={(e) => { setEventData((prev) => ({ ...prev, type: e.target.value })) }} placeholder="Donation" />
                        </label>
                    </div>
                </form>
                <button
                    onClick={() => addEvent()}
                    className="h-12 mt-5 mr-12 w-36 bg-black text-white rounded-md flex justify-center items-center border-2 border-black"
                >
                    Edit
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default AddEvent