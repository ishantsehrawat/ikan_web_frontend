import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "./firebase-config";

import {
  Home,
  Login,
  Events,
  EventDetail,
  Profile,
  About,
  Register,
  Donate,
  NotFound,
  AddEvent,
  Organisations,
  UserProfile,
  Volunteers,
  VolunteerDetail,
  VerifyEmail,
  Verification,
  OrganisationJoin,
  OrganisationProfile,
  Explore,
} from "./Pages";

function App() {
  const user = localStorage.getItem("token");
  const [userData, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route index element={!user ? <Login /> : <Home />} />
        <Route path="register" element={<Register />} />
        {user && userData?.emailVerified && (
          <>
            {/* <Route path="events/:loc/:date/:eventTypeID" element={<Events />} /> */}
            <Route
              path="events/:city/:state/:country/:date/:eventTypeID"
              element={<Events />}
            />
            <Route path="events" element={<Events />} />
            <Route path="explore" element={<Explore />} />
            <Route path="event-detail/:eid" element={<EventDetail />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="edit-profile" element={<Profile />} />
            <Route path="profile/:uid" element={<UserProfile />} />
            <Route path="about" element={<About />} />
            <Route path="donate" element={<Donate />} />
            <Route
              path="organisations/:city/:state/:country/:name/:scale"
              element={<Organisations />}
            />
            <Route path="organisations" element={<Organisations />} />
            <Route
              path="organisation-profile/:oid"
              element={<OrganisationProfile />}
            />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="volunteer-detail" element={<VolunteerDetail />} />
            <Route path="verification" element={<Verification />} />
            <Route path="organisation-join" element={<OrganisationJoin />} />
          </>
        )}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route
          path="*"
          element={userData?.emailVerified ? <NotFound /> : <VerifyEmail />}
        />
      </Routes>
    </div>
  );
}

export default App;
