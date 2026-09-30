const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");

const upload = multer();

router.post("/pest-detect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const response = await axios({
      method: "POST",
      url: `https://api.clarifai.com/v2/models/INSECTS TRAIN/versions/d80369d396d0444daaa24da236acb768/outputs`,
      headers: {
        Authorization: `Key ${process.env.CLARIFAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        inputs: [
          {
            data: {
              image: {
                base64: req.file.buffer.toString("base64"),
              },
            },
          },
        ],
      },
    });

    const concepts = response.data.outputs[0].data.concepts;

    const top = concepts[0];

    res.json({
      pest: top.name,
      confidence: top.value.toFixed(2),
    });

  } catch (error) {
    console.error("Clarifai Pest Detection Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Pest detection failed",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
