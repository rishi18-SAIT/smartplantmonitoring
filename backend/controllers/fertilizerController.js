const axios = require("axios");

exports.getFertilizerAdvice = async (req, res) => {
  const { disease, soil_moisture, temperature } = req.body;

  try {
    // Fetch live weather
    const weatherAPI = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current_weather=true`
    );

    const weatherTemp = weatherAPI.data.current_weather.temperature;

    let advice = "Apply balanced NPK fertilizer (10-26-26).";

    // RULES BASED ON DISEASE
    if (disease && disease.toLowerCase().includes("blight")) {
      advice = "Use Potassium-rich fertilizer (MOP) to strengthen immunity.";
    }
    if (disease && disease.toLowerCase().includes("rust")) {
      advice = "Apply Nitrogen-rich fertilizer (Urea).";
    }
    if (disease && disease.toLowerCase().includes("spot")) {
      advice = "Use DAP (Phosphorus rich) for recovery.";
    }

    // RULES BASED ON SOIL MOISTURE
    if (soil_moisture < 30) {
      advice += " Soil is too dry — add organic compost to retain moisture.";
    } else if (soil_moisture > 70) {
      advice += " Soil moisture high — avoid nitrogen fertilizers for now.";
    }

    // RULES BASED ON TEMPERATURE
    if (temperature > 35) {
      advice += " High temperature detected — use slow-release fertilizer.";
    } else if (temperature < 20) {
      advice += " Low temp — use liquid fertilizers for faster absorption.";
    }

    // RULES BASED ON LIVE WEATHER
    if (weatherTemp > 34) {
      advice += " Weather is hot — avoid Urea during peak heat.";
    }

    res.json({
      fertilizer_advice: advice,
      weather_used: weatherTemp
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing fertilizer recommendation" });
  }
};
