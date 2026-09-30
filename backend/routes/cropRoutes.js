const express = require("express");
const { recommendCrop } = require("../controllers/cropController");

const router = express.Router();

router.post("/crop-recommend", recommendCrop);

module.exports = router;
