const nodemailer = require('nodemailer');
const User = require('../models/User'); // Import your User model

// Create a transporter object using your .env credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send a PLANT MOISTURE ALERT
exports.sendAlertEmail = async (req, res) => {
  try {
    const { plantName, currentMoisture, threshold } = req.body;
    const userId = req.user.id; // Get user ID from authMiddleware

    // Find the user in the database to get their email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `💧 Plant Alert: ${plantName} needs water!`,
      html: `
        <h1>🌿 Smart Plant Monitoring Alert</h1>
        <p>Hi ${user.name},</p>
        <p>Your plant, <strong>${plantName}</strong>, has a low moisture level.</p>
        <ul>
          <li>Current Moisture: <strong>${currentMoisture}%</strong></li>
          <li>Your Threshold: <strong>${threshold}%</strong></li>
        </ul>
        <p>Please water it soon!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Alert email sent successfully' });

  } catch (err) {
    console.error('Email sending error:', err);
    res.status(500).send('Error sending email');
  }
};

// ✅ Function to send a LOGIC CONFIRMATION email
exports.sendLogicConfirmationEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: '✅ Settings Saved Successfully!',
      html: `
        <h1>🌿 Settings Confirmed</h1>
        <p>Hi ${user.name},</p>
        <p>Your settings for the Smart Plant Monitoring system have been saved successfully.</p>
        <p>You will now receive email alerts according to your new configuration.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Confirmation email sent successfully' });
  } catch (err) {
    console.error('Confirmation email error:', err);
    res.status(500).send('Error sending confirmation email');
  }
};