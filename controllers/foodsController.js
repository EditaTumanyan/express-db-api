const db = require("../database/db");
const { foodSchema } = require("../validators/foodValidators");

const createFood = async (req, res) => {
  const { error } = foodSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages.join(", ") });
  }

  const { name, price } = req.body;

  try {
    await db.getInstance()("foods").insert({ name, price });
    return res.status(201).json({ message: "Food created" });
  } catch (error) {
    console.error("Error creating food:", error.message);
    return res.status(500).json({ message: "Error creating food" });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await db.getInstance()("foods").select("*");
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
