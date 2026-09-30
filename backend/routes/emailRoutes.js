const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { sendAlertEmail, sendLogicConfirmationEmail } = require('../controllers/emailController');

// POST /api/email/alert
// Sends a plant moisture alert email. Protected by authMiddleware.
router.post('/alert', authMiddleware, sendAlertEmail);

// POST /api/email/confirm-logic
// Sends an email confirming settings were saved. Protected by authMiddleware.
router.post('/confirm-logic', authMiddleware, sendLogicConfirmationEmail);

module.exports = router;