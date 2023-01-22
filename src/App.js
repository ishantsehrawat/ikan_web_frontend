import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
  OrganisationDetail,
  Volunteers,
  VolunteerDetail,
  Verification,
  OrganisationJoin
} from "./Pages";

function App() {
  const user = localStorage.getItem("token");
  console.log(user);

  return (
    <Router>
      <div className="h-screen w-full bg-cgrey">
        <Routes>
          <Route index element={!user ? <Login /> : <Home />} />
          <Route path="register" element={<Register />} />
          {user && (
            <>
              <Route path="events" element={<Events />} />
              <Route path="event-detail" element={<EventDetail />} />
              <Route path="add-event" element={<AddEvent />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="donate" element={<Donate />} />
              <Route path="organisations" element={<Organisations />} />
              <Route path="organisation-detail" element={<OrganisationDetail />} />
              <Route path="volunteers" element={<Volunteers/>} />
              <Route path="volunteer-detail" element={<VolunteerDetail />} />
              <Route path="verification" element={<Verification />} />
              <Route path="organisation-join" element={<OrganisationJoin />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
