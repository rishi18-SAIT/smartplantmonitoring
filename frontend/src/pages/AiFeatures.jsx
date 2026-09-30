import React from "react";
import "./AiFeatures.css";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaBook, FaFlask, FaBug, FaChartLine, FaSeedling ,FaCloudSun} from "react-icons/fa";

export default function AIFeatures() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Disease Scanner",
      desc: "Detect leaf diseases using AI",
      icon: <FaLeaf />,
      action: () => navigate("/disease-scanner"),
      color: "#27ae60"
    },
    {
      title: "Crop Recommendation",
      desc: "AI suggests best crops to grow",
      icon: <FaSeedling />,
      action: () => navigate("/crop-recommendation"),
      color: "#16a085"
    },
    {
      title: "Fertilizer Advisor",
      desc: "Suggest ideal fertilizer based on soil",
      icon: <FaFlask />,
      action: () => navigate("/fertilizer-advisor"),
      color: "#2980b9"
    },
    {
      title: "Pest Detection",
      desc: "Upload plant image to detect pests",
      icon: <FaBug />,
      action: () => navigate("/pest-detection"),
      color: "#c0392b"
    },
    {
      title: "Growth Predictor",
      desc: "Predict plant growth & health",
      icon: <FaChartLine />,
      action: () => navigate("/growth-predictor"),
      color: "#8e44ad"
    },
     {
      title: "Ai Chatbot",
      desc: "Get instant answers to your plant care questions",
      icon: <FaBook />,
      action: () => navigate("/chatbot"),
      color: "#d35400"
    },
    {
  title: "Weather Assistant",
  desc: "Get live weather of your current location",
  icon: <FaCloudSun />,
  action: () => navigate("/weather"),
  color: "#3498db"
}

  ];

  return (
    <div className="ai-wrapper">
      <h1 className="title">AI Features</h1>
      <p className="subtitle">Smart agriculture tools powered by AI</p>

      <div className="grid">
        {cards.map((item, index) => (
          <div
            className="ai-card"
            key={index}
            style={{ borderTop: `4px solid ${item.color}` }}
            onClick={item.action}
          >
            <div className="icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
