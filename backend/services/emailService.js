const nodemailer = require('nodemailer');

// Configure the email transporter once and export it
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML body of the email.
 */
exports.sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Smart Plant Monitoring" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    // In a real app, you might want to throw the error to be handled by the caller
  }
};