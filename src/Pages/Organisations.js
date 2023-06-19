import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";

import { Navbar, OrganisationTile, Footer, EventSearch } from "../components";
import { auth, db } from "../firebase-config";

const Organisations = () => {
  const [orgs, setOrgs] = useState([]);
  const [userData, setUserData] = useState({});
  const params = useParams();

  console.log(params);

  useEffect(() => {
    const orgRef = collection(db, "organisations");
    const getOrgs = async () => {
      const snapshots = await getDocs(orgRef);
      const docs = snapshots.docs.map((doc) => doc.data());
      setOrgs(docs);
    };
    getOrgs();
  }, []);

  const user = auth.currentUser;
  useEffect(() => {
    const userRef = doc(db, "users", user.email);
    const getUser = async () => {
      const snapshots = await getDoc(userRef);
      const docs = snapshots.data();
      setUserData(docs);
    };

    getUser();
  }, [user.email]);

  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader  h-1/2 w-full p-4 md:p-10">
        <Navbar Page="organisations" />
        <div className="mt-20 text-white md:mt-28 ml-5 mb-10">
          <h1 className="text-4xl font-bold mb-3">Organisations</h1>
          <p>
            Discover Organisations that you are interested in and make a change.
          </p>
        </div>
      </div>
      <div className="px-10 -mt-20">
        <EventSearch
          searchParameters={["location", "name", "scale"]}
          page="organisations"
        />
      </div>
      <div className="pt-12 flex flex-col items-center gap-5">
        {orgs.map((org) => {
          return (
            <OrganisationTile
              key={org?.POC?.email}
              orgData={org}
              user={userData}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Organisations;
