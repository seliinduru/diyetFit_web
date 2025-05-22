import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/register";
import ForgetPassword from "./pages/Login/forget_password";
import DietQuestions from "./pages/Login/create_diet";
import MainPage from "./pages/Login/main_page";
import KacKalori from "./pages/Login/KacKalori"; // <-- EKLENDİ
import BKİ from "./pages/Login/vki/vki";
import Food from "./pages/Login/food/index";
import UserPanel from "./pages/Login/userPanel";
import UserProfilePage from "./pages/Login/profile";
import SavedDietPlans from "./pages/Login/SavedDietPlans";


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
        <Route path="/main_page" element={<MainPage />} />
        <Route path="/kac_kalori" element={<KacKalori />} /> {/* <-- YENİ ROUTE */}
        <Route path="/vki" element={<BKİ />} />
        <Route path="/recipes" element={<Food />} />
        <Route path="/userPanel" element={<UserPanel />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/SavedDietPlans" element={<SavedDietPlans />} />

        
        
      </Routes>
    </Router>
  );
};

export default App;
