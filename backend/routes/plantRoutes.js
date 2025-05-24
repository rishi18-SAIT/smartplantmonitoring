const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

// @route   GET /api/plants
// @desc    Fetch all plants
router.get('/', plantController.getAllPlants);

// @route   POST /api/plants
// @desc    Add a new plant
router.post('/', plantController.createPlant);

// @route   POST /api/plants/updateMoisture
// @desc    Update moisture level and trigger email alert if needed
router.post('/updateMoisture', plantController.updateMoisture);

// @route   PUT /api/plants/:id/settings
// @desc    Update plant settings (threshold, watering frequency, etc.)
router.put('/:id/settings', plantController.updateSettings);

module.exports = router;
