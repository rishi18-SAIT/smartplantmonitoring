const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [
          { role: "user", content: message }
        ],
        max_tokens: 512,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const botReply = response.data.choices[0].message.content;

    res.json({ reply: botReply });

  } catch (error) {
    console.error("Chatbot Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "HuggingFace Router API Error",
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;