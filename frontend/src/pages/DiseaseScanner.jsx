import React, { useEffect } from "react";

export default function DiseaseScanner() {

  // Automatically open Streamlit app when this page loads
  useEffect(() => {
    window.open("http://localhost:8501", "_blank");
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Disease Scanner</h2>
      <p>Your leaf disease detector will open in a new tab.</p>

      {/* Button to Open Disease Detector */}
      <button
        onClick={() => window.open("http://localhost:8501", "_blank")}
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          backgroundColor: "#27ae60",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          marginTop: "20px",
          marginRight: "20px"
        }}
      >
        Open Disease Detector Again
      </button>

      {/* Button to Open Fertilizer Advisor */}
      <button
        onClick={() => window.open("http://localhost:3000/fertilizer-advisor", "_blank")}
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          backgroundColor: "#2980b9",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Get Fertilizer Recommendation
      </button>

    </div>
  );
}
