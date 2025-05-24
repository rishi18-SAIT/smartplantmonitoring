const Plant = require('../models/Plant');
const { checkMoistureLevels } = require('../services/notificationService');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

// Reusable email sender
const sendEmail = async (recipientEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to', recipientEmail);
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
  }
};

// GET all plants
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Failed to get plants', error: error.message });
  }
};

// POST create a new plant
exports.createPlant = async (req, res) => {
  try {
    const { lastWatered = Date.now(), name, location, moistureThreshold, currentMoisture, wateringFrequency, alertEnabled, imageUrl } = req.body;

    // Validate required fields
    if (!name || !location || !moistureThreshold || !currentMoisture || !wateringFrequency) {
      return res.status(400).json({ message: 'All required fields (name, location, moistureThreshold, currentMoisture, wateringFrequency) must be provided' });
    }

    const plantData = { lastWatered, name, location, moistureThreshold, currentMoisture, wateringFrequency, alertEnabled, imageUrl };
    const plant = new Plant(plantData);
    await plant.save();

    res.status(201).json(plant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(400).json({ message: 'Failed to add plant', error: error.message });
  }
};

// POST update moisture and send alert
exports.updateMoisture = async (req, res) => {
  const { plantId, moisture } = req.body;

  // Validate moisture level
  if (moisture < 0 || moisture > 100) {
    return res.status(400).json({ message: 'Moisture level must be between 0 and 100' });
  }

  try {
    const plant = await Plant.findByIdAndUpdate(
      plantId,
      { currentMoisture: moisture },
      { new: true }
    );

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    // 🌿 Trigger alert logic
    const needsAlert = await checkMoistureLevels(plant);

    if (needsAlert) {
      const email = plant.email || 'default-email@example.com';
      await sendEmail(email, 'Moisture Level Alert', 'Your plant needs watering!');
    }

    res.status(200).json({ message: 'Moisture updated successfully', plant });
  } catch (error) {
    console.error('Error updating moisture:', error);
    res.status(500).json({ message: 'Failed to update moisture', error: error.message });
  }
};

// PUT update plant settings
exports.updateSettings = async (req, res) => {
  try {
    const updated = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json({ message: 'Settings updated successfully', updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(400).json({ message: 'Failed to update settings', error: error.message });
  }
};
