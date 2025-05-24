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
app.use('/api/plants', plantRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('🌿 Smart Plant Monitoring API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
