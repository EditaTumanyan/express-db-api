const express = require("express");
const router = express.Router();
const { createShop, getShops } = require("../controllers/shopsController");

router.post("/", createShop);
router.get("/", getShops);

module.exports = router;
