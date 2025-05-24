import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddPlant from './pages/AddPlant';
import ViewPlants from './pages/ViewPlants';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Glassmorphic Navbar */}
        <Navbar />

        {/* Main Page Content */}
        <main className="page-content">
          <Routes>
            {/* Redirect to Dashboard if root is accessed */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-plant" element={<AddPlant />} />
            <Route path="/view-plants" element={<ViewPlants />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          
            
           
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
