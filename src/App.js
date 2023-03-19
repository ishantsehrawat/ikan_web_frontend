import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { auth } from "./firebase-config";

// import {
//   Home,
//   Login,
//   Events,
//   EventDetail,
//   Profile,
//   About,
//   Register,
//   Donate,
//   NotFound,
//   AddEvent,
//   Organisations,
//   OrganisationDetail,
//   Volunteers,
//   VolunteerDetail,
//   Verification,
//   OrganisationJoin,
//   ComingSoon,
//   VerifyEmail,
// } from "./Pages";
import { Login, Register, ComingSoon, VerifyEmail, NotFound } from "./Pages";

function App() {
  const user = localStorage.getItem("token");
  const userData = auth.currentUser;
  console.log(userData);

  return (
    <Router>
      <div className="h-screen w-full bg-cgrey">
        <Routes>
          <Route index element={!user ? <Login /> : <ComingSoon />} />
          <Route path="register" element={<Register />} />
          {/* {user && userData?.emailVerified && (
            <>
              <Route path="events/:loc/:date/:events" element={<Events />} />
              <Route path="events" element={<Events />} />
              <Route path="event-detail" element={<EventDetail />} />
              <Route path="add-event" element={<AddEvent />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="donate" element={<Donate />} />
              <Route path="organisations" element={<Organisations />} />
              <Route
                path="organisation-detail"
                element={<OrganisationDetail />}
              />
              <Route path="volunteers" element={<Volunteers />} />
              <Route path="volunteer-detail" element={<VolunteerDetail />} />
              <Route path="verification" element={<Verification />} />
              <Route path="organisation-join" element={<OrganisationJoin />} />
            </>
          )} */}

          {/* <Route path="*" element={<NotFound />} /> */}
          <Route
            path="*"
            element={userData?.emailVerified ? <NotFound /> : <VerifyEmail />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
