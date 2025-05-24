const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the plant
  location: { type: String, required: true }, // Location of the plant
  moistureThreshold: { type: Number, required: true }, // Moisture threshold for alerts
  currentMoisture: { type: Number, required: true }, // Current moisture level
  wateringFrequency: { type: Number, required: true }, // How often the plant should be watered (in days)
  lastWatered: { type: Date, required: true }, // Date when the plant was last watered
  alertEnabled: { type: Boolean, default: true }, // Flag to check if alerts are enabled
  imageUrl: { type: String }  // URL for plant's image (if any)
});

module.exports = mongoose.model('Plant', plantSchema);
