import React, { useState } from "react";
import Profile from "./pages/profile"
import Settings from "./pages/settings";
import Matches from "./pages/matches";
import { Route, Routes, useNavigate} from "react-router-dom"
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import OpeningScreen from "./pages/OpeningScreen";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import GpsComponent from "./pages/components/GpsComponent";
import { UserDataProvider } from "./pages/components/User";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleLogin = () => {
    // Handle login logic, set isLoggedIn to true
    setIsLoggedIn(true);
    
  };

  const handleCreation = () => {
    setIsCreated(true);
    setIsLoggedIn(true);
  }


  const handleLogOut = () => {
    setIsLoggedIn(false);
  }

  return (
  <div className="main">
    <div>
      <UserDataProvider>
      {!isLoggedIn ? (
            <>
            <Routes>
              <Route path="/" element={<OpeningScreen />} />
              <Route path="/SignUp" element={<SignUp onLogin={handleLogin}/>} />
              <Route path="/LogIn" element={<LogIn onLogin={handleLogin} />} />
              <Route path="/EditProfile" element={<EditProfile onCreation={handleCreation}/>} />
            </Routes>
            </>
          ) : (
              <>
              <Routes>
              <Route path="/EditProfile" element={<EditProfile onCreation={handleCreation}/>} />
              <Route path="/home" element={<Home onSelect={isCreated}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings onLogOut ={handleLogOut} />} />
              <Route path="/matches" element={<Matches onSelect={isCreated} />} />
              </Routes>
              </>

          )}
          </UserDataProvider>
    </div>
    
  </div>
  
  );
}

export default App;
