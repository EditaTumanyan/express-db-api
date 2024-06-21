const express = require("express");
const router = express.Router();
const foodsController = require("../controllers/foodsController");

router.post("/", foodsController.createFood);
router.get("/", foodsController.getFoods);

module.exports = router;
