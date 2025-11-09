import React from "react";
import {  Routes, Route, Navigate,Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar.jsx"
import Work from "./pages/Work.jsx";
export default function App() {
  return (
        <div className="h-screen w-full">
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
