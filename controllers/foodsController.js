const db = require("../db");

const createFood = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  try {
    await db("foods").insert({ name, price });
    return res.status(201).json({ message: "Food created" });
  } catch (error) {
    console.error("Error creating food:", error.message);
    return res.status(500).json({ message: "Error creating food" });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await db("foods").select("*");
    return res.status(200).json(foods);
  } catch (error) {
    console.error("Error getting foods:", error.message);
    return res.status(500).json({ message: "Error getting foods" });
  }
};

module.exports = {
  createFood,
  getFoods,
};
