import React, { useState } from "react";

export default function GrowthPredictor() {
  const [form, setForm] = useState({
    temperature: "",
    moisture: "",
    sunlight: "",
    days: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/growth-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setResult(data.estimated_growth);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error predicting growth. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="growth-wrapper">
      <div className="growth-container">
        <h2 className="growth-title">
          🌿 Plant Growth Predictor
        </h2>

        <div className="input-grid">
          <div className="form-group">
            <label className="form-label">Temperature (°C)</label>
            <input
              className="form-input"
              name="temperature"
              type="number"
              placeholder="e.g., 25"
              onChange={handleChange}
              value={form.temperature}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Soil Moisture (%)</label>
            <input
              className="form-input"
              name="moisture"
              type="number"
              placeholder="e.g., 60"
              onChange={handleChange}
              value={form.moisture}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sunlight Hours</label>
            <input
              className="form-input"
              name="sunlight"
              type="number"
              placeholder="e.g., 8"
              onChange={handleChange}
              value={form.sunlight}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Days After Planting</label>
            <input
              className="form-input"
              name="days"
              type="number"
              placeholder="e.g., 30"
              onChange={handleChange}
              value={form.days}
            />
          </div>
        </div>

        <button
          className="predict-button"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Growth"}
        </button>

        {result && (
          <div className="result-box">
            <div className="growth-icon">🌱</div>
            <p className="result-label">Estimated Growth</p>
            <h2 className="result-value">{result}%</h2>
          </div>
        )}
      </div>
    </div>
  );
}