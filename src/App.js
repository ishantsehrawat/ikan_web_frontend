import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./Pages";

function App() {
  return (
    <Router>
      <div className="App h-screen w-full p-10 bg-cgrey">
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="signup" element={<SignUp />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
