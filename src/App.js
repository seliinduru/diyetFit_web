// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/home"; // Anasayfa bileşeni
import Login from "./pages/Login/Login"; // Giriş yapma bileşeni
import Register from "./pages/Login/register"; // Kayıt olma bileşeni
import ForgetPassword from "./pages/Login/forget_password";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Anasayfa */}
        <Route path="/login" element={<Login />} /> {/* Giriş Sayfası */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Kayıt Ol Sayfası */}
        {/* Diğer rotalar eklenebilir */}
        <Route path="/home" element={<Home />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
