import React from "react";
import Navbar from "./Navbar";
import Profile from "./pages/profile"
import Settings from "./pages/settings";
import Matches from "./pages/matches";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import WebApp from "./WebApp";


function App() {
  return (
  <div className="main">
    <Navbar />
    <div>
       <Routes>
        <Route path = "/" element ={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/matches" element={<Matches />} />
       </Routes>
    </div>
  </div>
  );
}

export default App;
