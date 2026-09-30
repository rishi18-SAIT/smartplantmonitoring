const express = require("express");
const { predictGrowth } = require("../controllers/growthController");

const router = express.Router();

router.post("/growth-predict", predictGrowth);

module.exports = router;
