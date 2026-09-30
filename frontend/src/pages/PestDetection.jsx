import React, { useState } from "react";
import "./PestDetection.css";

const SUPPORTED_PESTS = [
  "Aphid",
  "Beetle",
  "Whitefly"
 
];

export default function PestDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const detectPest = async () => {
    if (!selectedImage) return;

    setLoading(true);

    try {
      // 🔴 TEMPORARY MOCK DETECTION (Random for demo)
      const random =
        SUPPORTED_PESTS[Math.floor(Math.random() * SUPPORTED_PESTS.length)];

      // ✅ Simulate delay
      await new Promise((r) => setTimeout(r, 1500));

      // ✅ You can replace this with backend response later
      const detectedPest = random;

      // ✅ Check if pest is supported
      const isSupported = SUPPORTED_PESTS.some(
        (p) => p.toLowerCase() === detectedPest.toLowerCase()
      );

      if (isSupported) {
        setResult(`✅ Pest Detected: ${detectedPest}`);
      } else {
        setResult("❌ Unknown or unsupported pest detected!");
      }
    } catch (error) {
      console.error(error);
      setResult("❌ Error detecting pest.");
    }

    setLoading(false);
  };

  return (
    <div className="pest-wrapper">
      <h2 className="pest-title">🪲 AI Pest Detection</h2>

      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && <img src={preview} alt="Preview" className="preview-img" />}

        <button onClick={detectPest} disabled={loading} className="detect-btn">
          {loading ? "Detecting..." : "Detect Pest"}
        </button>
      </div>

      {result && (
        <div className="result-box">
          <h3>Result:</h3>
          <p className="pest-result">{result}</p>
        </div>
      )}
    </div>
  );
}
