const notificationService = require('../services/notificationService');
const Plant = require('../models/Plant');

// Check and notify if the plant needs water
exports.checkAndNotify = async (plant) => {
  try {
    if (plant.alertEnabled && plant.currentMoisture < plant.moistureThreshold) {
      // Send email alert
      await notificationService.sendEmailAlert(plant);
    }
  } catch (err) {
    console.error('Error checking and sending notification for plant:', plant.name, err);
  }
};
