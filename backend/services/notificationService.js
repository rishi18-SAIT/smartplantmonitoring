const nodemailer = require('nodemailer');
require('dotenv').config(); // Make sure to load environment variables

// Create a transporter using Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail service
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // App-specific password from .env
  },
});

// Function to send an email alert when plant moisture is low
const sendEmailAlert = (plant) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email (your Gmail)
    to: 'rishikesh9098@gmail.com', // Replace with recipient email
    subject: 'Plant Watering Alert',
    text: `${plant.name} needs water! Current moisture: ${plant.currentMoisture}%`,
    html: `
      <h1>Watering Alert for ${plant.name}</h1>
      <p><strong>Current Moisture:</strong> ${plant.currentMoisture}%</p>
      <p><strong>Moisture Threshold:</strong> ${plant.moistureThreshold}%</p>
      <p><strong>Last Watered:</strong> ${new Date(plant.lastWatered).toLocaleDateString()}</p>
      <p><strong>Location:</strong> ${plant.location}</p>
      <p><strong>Action:</strong> Water the plant as soon as possible!</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Example logic for checking moisture levels
const checkMoistureLevels = async (plant) => {
  if (plant.currentMoisture < plant.moistureThreshold && plant.alertEnabled) {
    sendEmailAlert(plant); // Send email alert if moisture is below the threshold
  }
};

module.exports = {
  sendEmailAlert,
  checkMoistureLevels,
};
