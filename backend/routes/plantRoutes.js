const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to ALL routes in this file
router.use(authMiddleware);

// --- Full CRUD Routes for Plants ---

// @route   GET /api/plants
// @desc    Get all plants for the logged-in user
router.get('/', plantController.getAllPlants);

// @route   POST /api/plants
// @desc    Create a new plant
router.post('/', plantController.createPlant);

// @route   GET /api/plants/:id
// @desc    Get a single plant by its ID
router.get('/:id', plantController.getPlantById);

// @route   PUT /api/plants/:id
// @desc    Update a plant's details
router.put('/:id', plantController.updatePlant);

// @route   DELETE /api/plants/:id
// @desc    Delete a plant
router.delete('/:id', plantController.deletePlant);

module.exports = router;