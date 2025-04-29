// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/register";
import ForgetPassword from "./pages/Login/forget_password";
import DietQuestions from "./pages/Login/create_diet"; // <-- BUNU EKLEDİM!

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/create_diet" element={<DietQuestions />} />
      </Routes>
    </Router>
  );
};

export default App;
