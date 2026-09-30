exports.recommendCrop = async (req, res) => {
  let { temperature, humidity, moisture } = req.body;

  try {
    // Convert all values to numbers
    temperature = Number(temperature);
    humidity = Number(humidity);
    moisture = Number(moisture);

    if (!temperature || !humidity || !moisture) {
      return res.status(400).json({
        error: "Please provide temperature, humidity and soil moisture"
      });
    }

    let recommendedCrop = "";
    let explanation = "";
    let alternatives = [];

    // 🔥 High Temperature Crops (30°C - 40°C)
    if (temperature >= 30 && humidity >= 40 && moisture >= 30) {
      recommendedCrop = "Millets";
      explanation = "Millets grow well in high heat, low rainfall, and medium moisture.";
      alternatives = ["Sorghum", "Bajra", "Corn"];
    }

    // 🌾 Wheat Zone (12°C - 25°C, dry climate)
    else if (temperature >= 12 && temperature <= 25 && humidity < 50 && moisture < 50) {
      recommendedCrop = "Wheat";
      explanation = "Wheat prefers cool temperature, dry air, and low soil moisture.";
      alternatives = ["Barley", "Oats"];
    }

    // 🌾 Rice Zone (25°C - 35°C, high moisture)
    else if (temperature >= 25 && temperature <= 35 && moisture >= 60) {
      recommendedCrop = "Rice";
      explanation = "Rice grows best in warm temperatures and high soil moisture.";
      alternatives = ["Sugarcane", "Paddy"];
    }

    // 🥔 Potato (10°C - 20°C, medium-humidity)
    else if (temperature >= 10 && temperature <= 20 && humidity >= 50 && moisture >= 40) {
      recommendedCrop = "Potato";
      explanation = "Potatoes prefer cool weather and well-drained soil.";
      alternatives = ["Peas", "Carrot"];
    }

    // 🥒 Vegetables Category
    else if (temperature >= 20 && temperature <= 30 && moisture >= 40 && humidity >= 50) {
      recommendedCrop = "Tomato";
      explanation = "Tomato grows well in moderate climate with balanced humidity.";
      alternatives = ["Cabbage", "Ladyfinger", "Brinjal"];
    }

    // Default fallback
    else {
      recommendedCrop = "Maize";
      explanation = "Maize can grow in diverse temperature and soil conditions.";
      alternatives = ["Green Gram", "Groundnut"];
    }

    return res.json({
      recommended_crop: recommendedCrop,
      reason: explanation,
      alternatives,
      input_data: {
        temperature,
        humidity,
        moisture
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Crop recommendation failed" });
  }
};
