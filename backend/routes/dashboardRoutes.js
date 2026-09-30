// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

// ✅ This route is now protected
// GET /api/dashboard/
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Because of the middleware, we know a valid user is making this request.
    // We can access the user's ID from req.user.id
    // Now you can fetch data specific to this user from the database.
    res.json({
      message: `Welcome to your dashboard, user ${req.user.id}!`,
      sensitiveData: "Here is your private dashboard information."
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;