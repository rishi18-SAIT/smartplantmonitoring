const express = require("express");
const { getFertilizerAdvice } = require("../controllers/fertilizerController");

const router = express.Router();

router.post("/fertilizer-ai", getFertilizerAdvice);

module.exports = router;
