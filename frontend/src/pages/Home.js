

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1>🌿 Welcome to AgriLeaf Guard</h1>
        <p>
          Smart Plant Monitoring and Disease Detection System. 
          Monitor your plants in real time, detect diseases, and 
          keep them healthy with AI-powered insights.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
         
        
          <Link to="/login" style={{ marginLeft: "1rem" }}>
            <button className="btn">Login</button>
          </Link>
          <Link to="/register" style={{ marginLeft: "1rem" }}>
            <button className="btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
