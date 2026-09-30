const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not defined in .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// ✅ Routes
const plantRoutes = require('./routes/plantRoutes');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const fertilizerRoutes = require('./routes/fertilizerRoutes');
const growthRoutes = require("./routes/growthRoutes");
const cropRoutes = require("./routes/cropRoutes");
const chatRoutes = require("./routes/chatRoutes");
const pestRoutes = require("./routes/pestRoutes");





app.use('/api/plants', plantRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/email', emailRoutes);
app.use('/api', fertilizerRoutes); 
app.use('/api', growthRoutes);
app.use('/api', cropRoutes);
app.use("/api", chatRoutes);
app.use("/api", pestRoutes);

const axios = require("axios");

app.post("/api/crop-recommend-ml", async (req, res) => {
  try {
    const mlRes = await axios.post("http://localhost:8000/predict-crop", req.body);
    res.json(mlRes.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ML service error" });
  }
});


// ✅ Health check
app.get('/', (req, res) => {
  res.send('🌿 Smart Plant Monitoring API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
