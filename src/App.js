// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/home";        // Anasayfa bileşeni
import Login from "./pages/Login/Login";      // Giriş yapma bileşeni
import Register from "./pages/Login/register";  // Kayıt olma bileşeni

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />        {/* Anasayfa */}
        <Route path="/login" element={<Login />} />  {/* Giriş Sayfası */}
        <Route path="/register" element={<Register />} />  {/* Kayıt Ol Sayfası */}
        {/* Diğer rotalar eklenebilir */}
      </Routes>
    </Router>
  );
};

export default App;
