import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Login, Register } from "./Pages";

function App() {
  return (
    <Router>
      <div className="h-screen w-full p-10 bg-cgrey">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="signup" element={<SignUp />} /> */}
          <Route path="register" element={<Register />} />
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
