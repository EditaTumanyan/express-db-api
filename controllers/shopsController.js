const db = require("../database/db");
const { shopSchema } = require("../validators/shopValidators");

const createShop = async (req, res) => {
  const { error } = shopSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages.join(", ") });
  }

  const { name } = req.body;
  try {
    await db.getInstance()("shops").insert({ name });
    return res.status(201).json({ message: "Shop created" });
  } catch (error) {
    console.error("Error creating shop:", error.message);
    return res.status(500).json({ message: "Error creating shop" });
  }
};

const getShops = async (req, res) => {
  try {
    const shops = await db
      .getInstance()
      .select(
        "shops.id as shop_id",
        "shops.name as shop_name",
        "foods.id as food_id",
        "foods.name as food_name",
        "foods.price as food_price"
      )
      .from("shops")
      .leftJoin("foods", "shops.id", "foods.shop_id")
      .orderBy("shops.id", "asc");

    const groupedShops = shops.reduce((acc, shop) => {
      const { shop_id, shop_name, food_id, food_name, food_price } = shop;

      const existingShop = acc.find((item) => item.shop_id === shop_id);

      if (existingShop) {
        if (food_id) {
          existingShop.foods.push({ food_id, food_name, food_price });
        }
      } else {
        const newShop = {
          shop_id,
          shop_name,
          foods: [],
        };
        if (food_id) {
          newShop.foods.push({ food_id, food_name, food_price });
        }
        acc.push(newShop);
      }
      return acc;
    }, []);

    return res.status(200).json(groupedShops);
  } catch (error) {
    console.error("Error getting shops:", error.message);
    return res.status(500).json({ message: "Error getting shops" });
  }
};

module.exports = { createShop, getShops };
