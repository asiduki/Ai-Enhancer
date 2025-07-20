const express = require("express");
const router = express.Router();
const { generateText } = require("../Controller/ai.controller");

router.post("/ai" , generateText);

module.exports = router;