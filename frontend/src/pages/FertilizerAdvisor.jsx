import React, { useState } from "react";
import "./fertilizerAdvisor.css";
import { API_BASE_URL } from "../api/axiosConfig";

export default function FertilizerAdvisor() {
  const [form, setForm] = useState({
    disease: "",
    soil_moisture: "",
    temperature: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/fertilizer-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setResult(data.fertilizer_advice);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error fetching fertilizer advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fertilizer-wrapper">
      <div className="fertilizer-container">
        <h2 className="fertilizer-title">
          🌱 AI Fertilizer Advisor
        </h2>

        <div className="form-group">
          <label className="form-label">Disease Detected</label>
          <input
            className="form-input"
            name="disease"
            placeholder="Enter disease name"
            onChange={handleChange}
            value={form.disease}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Soil Moisture (%)</label>
          <input
            className="form-input"
            name="soil_moisture"
            type="number"
            placeholder="Enter soil moisture percentage"
            onChange={handleChange}
            value={form.soil_moisture}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Temperature (°C)</label>
          <input
            className="form-input"
            name="temperature"
            type="number"
            placeholder="Enter temperature"
            onChange={handleChange}
            value={form.temperature}
          />
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Getting Advice..." : "Get Fertilizer Advice"}
        </button>

        {result && (
          <div className="result-box">
            <h3 className="result-title">Recommended Fertilizer:</h3>
            <p className="result-text">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}