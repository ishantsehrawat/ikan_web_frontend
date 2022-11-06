import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Login, Events, EventDetail, Profile, About } from "./Pages";

function App() {
  return (
    <Router>
      <div className="h-screen w-full bg-cgrey">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="events" element={<Events />} />
          <Route path="event-detail" element={<EventDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          {/* <Route path="signup" element={<SignUp />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
