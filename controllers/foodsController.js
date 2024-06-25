const db = require("../database/db");
const { foodSchema } = require("../validators/foodValidators");

const createFood = async (req, res) => {
  const { error } = foodSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages.join(", ") });
  }

  const { name, price, shop_id } = req.body;

  const shopExists = await db
    .getInstance()("shops")
    .where({ id: shop_id })
    .first();
  if (!shopExists) {
    return res
      .status(404)
      .json({ message: `Shop with id ${shop_id} does not exist` });
  }

  try {
    await db.getInstance()("foods").insert({ name, price, shop_id });
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
