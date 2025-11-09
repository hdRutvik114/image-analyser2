import React from "react";
import {  Routes, Route, Navigate,Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar.jsx"
import Work from "./pages/Work.jsx";
import Threads from "./components/Threads.jsx";
import Aurora from "./components/Aurora.jsx"
export default function App() {
  return (
        <div className="relative h-screen w-full overflow-hidden">
             <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

       <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Work" element={<Work />} />
        <Route path="*" element={<h1 className="text-center mt-20">Page Not Found</h1>} />
      </Routes>


        </div>
          
  );
}
