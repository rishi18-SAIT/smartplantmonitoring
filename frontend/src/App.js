import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import ViewPlants from "./pages/ViewPlants";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

// AI Feature Pages
import AIFeatures from "./pages/AiFeatures";
import DiseaseScanner from "./pages/DiseaseScanner";
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerAdvisor from "./pages/FertilizerAdvisor";
import PestDetection from "./pages/PestDetection";
import GrowthPredictor from "./pages/growthPredictor";
import Chatbot from "./pages/Chatbot";
import WeatherCard from "./pages/WeatherCard";


// import YieldPredictor from "./pages/YieldPredictor";

// Wrapper to handle navbar visibility
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Hide Navbar ONLY on home page "/" */}
      {location.pathname !== "/" && <Navbar />}

      {/* Page Routing */}
      <main className="page-content">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= PROTECTED ROUTES ================= */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view-plants" element={<ViewPlants />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />

            {/* ================= AI FEATURE ROUTES ================= */}
            <Route path="/aifeatures" element={<AIFeatures />} />

            <Route path="/disease-scanner" element={<DiseaseScanner />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/fertilizer-advisor" element={<FertilizerAdvisor />} />
            <Route path="/pest-detection" element={<PestDetection />} />
             <Route path="/growth-predictor" element={<GrowthPredictor />} />
             <Route path="/chatbot" element={<Chatbot />} />
             <Route path="/weather" element={<WeatherCard />} />
            {/* <Route path="/yield-predictor" element={<YieldPredictor />} /> */}
          </Route>
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
