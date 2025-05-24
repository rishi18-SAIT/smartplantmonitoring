const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'your-second-email@example.com', // <-- use a different recipient email to test
  subject: 'Smart Plant Test Email',
  text: 'This is a test from your NodeMailer config.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('❌ Email Error:', error);
  }
  console.log('✅ Email sent:', info.response);
});
