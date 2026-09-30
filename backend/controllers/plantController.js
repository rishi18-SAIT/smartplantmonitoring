const Plant = require('../models/Plant');
const { checkMoistureLevels } = require('../services/notificationService');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (recipientEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = { from: process.env.EMAIL_USER, to: recipientEmail, subject, text };

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
    const plants = await Plant.find({ user: req.user.id });
    res.status(200).json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get plants', error: error.message });
  }
};

// GET single plant
exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findOne({ _id: req.params.id, user: req.user.id });
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch plant', error: error.message });
  }
};

// CREATE plant
exports.createPlant = async (req, res) => {
  try {
    const { name, location, moistureThreshold, currentMoisture, wateringFrequency, alertEnabled, imageUrl, email } = req.body;

    if (!name || !location || !moistureThreshold || !currentMoisture || !wateringFrequency) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const plant = new Plant({
      user: req.user.id,
      name,
      location,
      moistureThreshold,
      currentMoisture,
      wateringFrequency,
      alertEnabled,
      imageUrl,
      email,
      lastWatered: Date.now(),
    });

    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to add plant', error: error.message });
  }
};

// UPDATE plant
exports.updatePlant = async (req, res) => {
  try {
    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedPlant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(updatedPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update plant', error: error.message });
  }
};

// DELETE plant
exports.deletePlant = async (req, res) => {
  try {
    const deletedPlant = await Plant.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedPlant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete plant', error: error.message });
  }
};

// UPDATE moisture
exports.updateMoisture = async (req, res) => {
  const { plantId, moisture } = req.body;
  if (moisture < 0 || moisture > 100) return res.status(400).json({ message: 'Moisture level must be 0-100' });

  try {
    const plant = await Plant.findOneAndUpdate(
      { _id: plantId, user: req.user.id },
      { currentMoisture: moisture },
      { new: true }
    );

    if (!plant) return res.status(404).json({ message: 'Plant not found' });

    if (await checkMoistureLevels(plant)) {
      await sendEmail(plant.email || 'default-email@example.com', 'Moisture Alert', 'Your plant needs watering!');
    }

    res.status(200).json({ message: 'Moisture updated successfully', plant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update moisture', error: error.message });
  }
};
