const express = require("express");
const router = express.Router();
const { createFood, getFoods } = require("../controllers/foodsController");

router.post("/", createFood);
router.get("/", getFoods);

module.exports = router;
