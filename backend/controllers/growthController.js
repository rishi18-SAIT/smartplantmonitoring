exports.predictGrowth = async (req, res) => {
  let { temperature, moisture, sunlight, days } = req.body;

  try {
    // Convert all values to numbers (IMPORTANT FIX)
    temperature = Number(temperature);
    moisture = Number(moisture);
    sunlight = Number(sunlight);
    days = Number(days);

    let growthRate = 1;

    if (temperature >= 20 && temperature <= 30) growthRate += 0.6;
    else if (temperature < 15) growthRate -= 0.4;
    else if (temperature > 35) growthRate -= 0.5;

    if (moisture >= 40 && moisture <= 70) growthRate += 0.5;
    else if (moisture < 30) growthRate -= 0.3;
    else if (moisture > 80) growthRate -= 0.2;

    if (sunlight >= 6 && sunlight <= 8) growthRate += 0.4;
    else if (sunlight < 4) growthRate -= 0.4;
    else if (sunlight > 10) growthRate -= 0.2;

    const growthPercent = Math.max(5, Math.min(100, growthRate * days));

    res.json({
      estimated_growth: growthPercent.toFixed(2)
    });

  } catch (error) {
    console.error("Growth API Error:", error);
    res.status(500).json({ error: "Error predicting plant growth" });
  }
};
