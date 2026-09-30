import React, { useState } from "react";
import "./cropRecommendation.css";

export default function CropRecommendation() {
  const [form, setForm] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/crop-recommend-ml", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data.recommended_crop);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌾 AI Crop Recommendation (ML Model)</h2>

      {["N","P","K","temperature","humidity","ph","rainfall"].map((item) => (
        <input
          key={item}
          name={item}
          placeholder={item.toUpperCase()}
          onChange={handleChange}
          style={{ display:"block", margin:"10px 0" }}
        />
      ))}

      <button onClick={handleSubmit}>Predict Crop</button>

      {result && (
        <h3 style={{ marginTop: "20px" }}>
          Recommended Crop: {result}
        </h3>
      )}
    </div>
  );
}
