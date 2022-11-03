import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Login, Events } from "./Pages";

function App() {
  return (
    <Router>
      <div className="h-screen w-full bg-cgrey">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="events" element={<Events />} />
          {/* <Route path="signup" element={<SignUp />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
