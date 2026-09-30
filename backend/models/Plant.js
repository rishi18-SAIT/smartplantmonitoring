const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  // ✨ Added a reference to the User model. This is crucial for security.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates a link to the 'User' collection
    required: true,
    index: true, // Improves performance when finding a user's plants
  },
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  moistureThreshold: {
    type: Number,
    required: true,
    min: 0,   // Validation: Ensures the value is between 0 and 100
    max: 100,
    default: 30, // A sensible default value
  },
  currentMoisture: {
    type: Number,
    default: 70, // A sensible starting default
  },
  wateringFrequency: {
    type: Number,
    required: true,
    min: 1, // Validation: Must be at least 1 day
  },
  lastWatered: {
    type: Date,
    default: Date.now, // Defaults to the moment the plant is created
  },
  alertEnabled: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
}, {
  // ✨ Automatically adds `createdAt` and `updatedAt` fields
  timestamps: true,
});

module.exports = mongoose.model('Plant', plantSchema);