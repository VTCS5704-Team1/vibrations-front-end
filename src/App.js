import React, { useState } from "react";
import Navbar from "./Navbar";
import Profile from "./pages/profile"
import Settings from "./pages/settings";
import Matches from "./pages/matches";
import { Route, Routes, useNavigate} from "react-router-dom"
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import OpeningScreen from "./pages/OpeningScreen";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic, set isLoggedIn to true
    setIsLoggedIn(true);
    navigate("/home");
    
  };

  return (
  <div className="main">
    <div>
      {!isLoggedIn ? (
            <>
            <Routes>
              <Route path="/" element={<OpeningScreen />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/CreateProfile" element={<CreateProfile />} />
              <Route path="/LogIn" element={<LogIn onLogin={handleLogin} />} />
            </Routes>
            </>
          ) : (
              <>
              <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/matches" element={<Matches />} />
              </Routes>
              </>

          )}
    </div>
  </div>
  );
}

export default App;
