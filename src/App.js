import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Home,
  Login,
  Events,
  EventDetail,
  Profile,
  About,
  Register,
} from "./Pages";

function App() {
  const user = localStorage.getItem("token");
  console.log(user);

  return (
    <Router>
      <div className="h-screen w-full bg-cgrey">
        <Routes>
          <Route index element={!user ? <Login /> : <Home />} />
          {user && (
            <>
              <Route path="register" element={<Register />} />
              <Route path="events" element={<Events />} />
              <Route path="event-detail" element={<EventDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
