import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { Favorite, FavoriteOutlinedIcon } from "@mui/icons-material";
import emailjs from "@emailjs/browser";
import { db, auth } from "../firebase-config";
import { eventObject } from "../Data/events";
import { Footer, Navbar } from "../components";

function EventDetail() {
  const { eid } = useParams();
  const [event, setEvent] = useState({});
  const [hostData, setHostData] = useState({});
  const [buttonTitle, setbuttonTitle] = useState("Apply Now");
  const [likeTitle, setLikeTitle] = useState("unliked");
  const [user, setUser] = useState({});
  const [infoVolun, setInfoVolun] = useState("Additional Info");
  const [volunteers, setVolunteers] = useState([]);
  // fetching user data on page load
  useEffect(() => {
    const currentUser = auth.currentUser;
    const colRef = doc(db, "users", String(currentUser?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setUser(docs);
    };

    getUser();
  }, []);
  // fetching events on page load
  useEffect(() => {
    const colRef = doc(db, "events", String(eid));
    const getEvent = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setEvent(docs);
    };

    getEvent();
    // getUser();
  }, [eid]);

  // fetching host data
  useEffect(() => {
    const userRef = doc(db, "users", String(event?.host));
    const getUser = async () => {
      const snapshots = await getDoc(userRef);
      const docs = snapshots.data();
      setHostData(docs);
    };

    getUser();
  }, [eid, event?.host]);
  useEffect(() => {
    setVolunteers([]);
    const getUser = async (interest) => {
      const userRef = doc(db, "users", String(interest));
      const snapshots = await getDoc(userRef);
      const docs = snapshots.data();
      setVolunteers((prev) => [...prev, docs]);
    };
    event?.interested?.map((interest) => {
      getUser(interest);
      return 1;
    });
  }, [event?.interested]);
  // checking if user is already interested in event
  useEffect(() => {
    if (
      event?.interested?.length > 0 &&
      event?.interested?.filter((item) => item === user?.email).length > 0
    ) {
      setbuttonTitle("Withdraw");
    }
    if (
      event?.liked?.length > 0 &&
      event?.liked?.filter((item) => item === user?.email).length > 0
    ) {
      setLikeTitle("liked");
    }
  }, [event?.interested, event?.liked, user?.email]);

  const category = eventObject.filter((item) => item.id === 1)[0].type;

  async function getUserData() {
    const docRef = doc(db, "users", user?.email);
    const snapshots = await getDoc(docRef);
    const docs = snapshots.data();
    setUser(docs);
  }
  async function getvolunteerData(interest) {
    const userRef = doc(db, "users", String(interest));
    const snapshots = await getDoc(userRef);
    const docs = snapshots.data();
    setVolunteers((prev) => [...prev, docs]);
  }
  async function getEventData() {
    const docRef = doc(db, "events", event?.eid);
    const snapshots = await getDoc(docRef);
    const docs = snapshots.data();
    setEvent(docs);
  }

  async function neditUser() {
    const ref = doc(db, "users", user?.email);

    // Atomically add a new region to the "regions" array field.
    const addEventField = {
      events: arrayUnion(event?.eid),
      volreq: event?.volreq - 1,
    };
    const removeEventField = {
      events: arrayRemove(event?.eid),
      volreq: event?.volreq + 1,
    };
    await updateDoc(
      ref,
      buttonTitle === "Apply Now" ? addEventField : removeEventField
    ).then(() => {
      if (buttonTitle === "Apply Now")
        window.alert("Event added to your profile!");
      else window.alert("Event removed from your profile!");
    });
    getUserData();
  }
  async function removeuser(volemail) {
    if (hostData?.email === user?.email) {
      const ref = doc(db, "users", volemail);
      const removeEventField = {
        events: arrayRemove(event?.eid),
        volreq: event?.volreq + 1,
      };
      const templateParams = {
        to_email: volemail,
        subject: "loren imsum",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac.",
      };
      await updateDoc(ref, removeEventField).then(() => {
        emailjs.send(
          "service_p2juihf",
          "template_19tq7uq",
          templateParams,
          "meQJ5evIialaxOAz1"
        );
        window.alert("Person removed. Email sent");
      });
      setVolunteers((prev) => {
        return prev.filter((vol) => vol !== volemail);
      });
      setVolunteers([]);
      event?.interested?.map((interest) => {
        getvolunteerData(interest);
        return 1;
      });
    } else {
      window.alert("You are not the event host");
    }
  }
  async function removeduserevent(volemail) {
    if (hostData?.email === user?.email) {
      const ref = doc(db, "events", event?.eid);
      const removeEventField = {
        interested: arrayRemove(volemail),
      };
      await updateDoc(ref, removeEventField).then(() => {
        window.alert("Person removed from event");
      });
      getEventData();
    } else {
      window.alert("You are not the event host");
    }
  }
  async function neditEvent() {
    const ref = doc(db, "events", event?.eid);

    // Atomically add a new region to the "regions" array field.
    const interested = event.interested;
    const addEventField = {
      interested: arrayUnion(...interested, user?.email),
    };
    const removeEventField = {
      interested: arrayRemove(user?.email),
    };
    await updateDoc(
      ref,
      buttonTitle === "Apply Now" ? addEventField : removeEventField
    ).then(() => {
      if (buttonTitle === "Apply Now")
        window.alert("Thank you for showing interest in this event");
      else window.alert("You have removed your interest from this event!");
    });
    getEventData();
  }
  async function neditUser2() {
    const ref = doc(db, "users", user?.email);

    // Atomically add a new region to the "regions" array field.
    const addEventField = {
      eventsliked: arrayUnion(event?.eid),
    };
    const removeEventField = {
      // events: Fieldvalue.arrayRemove(eventData?.eid),
      eventsliked: arrayRemove(event?.eid),
    };
    await updateDoc(
      ref,
      likeTitle === "unliked" ? addEventField : removeEventField
    ).then((res) => {
      if (likeTitle === "unliked") window.alert("Event liked to your profile!");
      else window.alert("Event unliked from your profile!");
    });
    getUserData();
  }
  async function neditEvent2() {
    const ref = doc(db, "events", event?.eid);
    // Atomically add a new region to the "regions" array field.
    const liked = event.liked;
    const addEventField = {
      liked: arrayUnion(...liked, user?.email),
    };
    const removeEventField = {
      liked: arrayRemove(user?.email),
    };
    await updateDoc(
      ref,
      likeTitle === "unliked" ? addEventField : removeEventField
    ).then(() => {
      if (likeTitle === "unliked")
        window.alert("Thank you for liking this event");
      else window.alert("You have unliked this event!");
    });
    getEventData();
  }

  function showInterest() {
    if (buttonTitle === "Apply Now") {
      neditUser();
      neditEvent();
      setbuttonTitle("Withdraw");
    } else {
      neditUser();
      neditEvent();
      setbuttonTitle("Apply Now");
    }
  }
  function showLikes() {
    if (likeTitle === "unliked") {
      neditUser2();
      neditEvent2();
      setLikeTitle("liked");
    } else {
      neditUser2();
      neditEvent2();
      setLikeTitle("unliked");
    }
  }
  function removal(volsemail) {
    removeuser(volsemail);
    removeduserevent(volsemail);
    if (volsemail === user?.email) {
      setbuttonTitle("Apply Now");
    }
  }
  return (
    <div className="bg-cgrey">
      <div className=" bg-eventDetail h-1/2 w-full p-4 md:p-10">
        <Navbar Page="event-detail" />
        <div className="mt-28 text-white mx-5 mb-40 md:mb-0">
          <h1 className="text-4xl font-bold mb-3">Event Details</h1>
          <p className="text-xs md:text-base">
            Welcome to the event details page. Here you will find all the
            information you need to know about a specific event, including date,
            time, location, and event description.
          </p>
        </div>
      </div>
      <div className="bg-cgrey rounded-t-lg p-[1px] md:p-0 m-8 md:m-0 -mt-32 md:mt-10 mb-10 flex justify-center items-center">
        <div className="">
          <div className="flex flex-col md:flex-row">
            <div className="flex w-full md:w-[600px]">
              {/* <div className="flex flex-col justify-between">
              <img className="h-1/3 p-1 " src={event1} alt="event" />
              <img className="h-1/3 p-1 " src={event1} alt="event" />
              <img className="h-1/3 p-1 " src={event1} alt="event" />
            </div> */}
              <img
                className="p-1  rounded-lg md:rounded-none"
                src={event?.img}
                alt="event"
              />
            </div>
            <div className="flex flex-col w-full md:w-[500px] justify-between md:ml-5 my-5">
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">{event?.name}</h2>
                  <p className="text-gray-500">
                    {event.City + ", " + event.State + ", " + event.Country}
                  </p>
                </div>
                <h4 className="text-sm text-gray-700">{event?.organisation}</h4>
              </div>
              <div className="">
                <p className="text-gray-500">{event?.description}</p>
                <p className="text-gray-500 mt-3">{event?.date}</p>
              </div>
              <div className="text-sm">
                <p>
                  Category: <span className="text-gray-500">{category}</span>
                </p>
                {hostData?.phone !== null ? (
                  <p>
                    Contact:{" "}
                    <span className="text-gray-500">{hostData?.phone}</span>
                  </p>
                ) : (
                  <></>
                )}
                <p>
                  Social:{" "}
                  <span className="text-gray-500">@project_zero_hunger</span>
                </p>
                <p>
                  Address: <span className="text-gray-500"></span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full justify-start mt-4 md:mb-10">
            <button
              className={
                buttonTitle === "Apply Now"
                  ? "h-10 w-full md:w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
                  : "h-10 w-full md:w-36 text-sm bg-black text-white rounded-md flex justify-center items-center"
              }
              disabled={event?.volreq <= 0 ? true : false}
              onClick={showInterest}
            >
              {buttonTitle}
            </button>
            <button onClick={showLikes}>
              <Favorite
                sx={{
                  color: `${likeTitle === "unliked" ? "#FFFFFF" : "#ff3140"}`,
                  stroke: "red",
                  fontSize: 40,
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-lightsaffron flex justify-center items-center px-10 md:px-0 py-10">
        <div className="w-full md:w-[1100px] flex flex-col">
          <span className="flex flex-row">
            <h3
              className="font-bold mb-2 "
              onClick={() => {
                setInfoVolun("Additional Info");
              }}
            >
              Additional information
            </h3>
            <h3
              className="font-bold mb-2 px-10"
              onClick={() => {
                setInfoVolun("Volunteers");
              }}
            >
              Volunteers
            </h3>
          </span>
          {infoVolun === "Additional Info" ? (
            <p className="text-sm">
              Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor
              ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris
              varius ac est bibendum. Scelerisque a, risus ac ante. Velit
              consectetur neque, elit, aliquet. Non varius proin sed urna,
              egestas consequat laoreet diam tincidunt. Magna eget faucibus cras
              justo, tortor sed donec tempus. Imperdiet consequat, quis diam
              arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate
              nunc nec. Dui, massa viverr .
            </p>
          ) : (
            <table className="table-auto">
              <thead>
                <tr>
                  <th>uid</th>
                  <th>email</th>
                  <th>type</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((vols) => {
                  return (
                    <tr key={vols.uid}>
                      <td>{vols.uid}</td>
                      <td>{vols.email}</td>
                      <td>{vols.type}</td>
                      <td>{vols.name}</td>
                      <td>
                        <img src={vols.photo} />
                      </td>
                      <td>
                        <button
                          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            removal(vols.email);
                          }}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer Page="notfound" />
    </div>
  );
}

export default EventDetail;
