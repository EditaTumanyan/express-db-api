const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const foodsRoutes = require("./routes/foodsRoutes");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.json());
app.use("/foods", foodsRoutes);

const db = knex(knexConfig.development);

db.migrate
  .latest()
  .then(() => {
    console.log("Database is ready");
  })
  .catch((error) => {
    console.error("Error setting up database:", error);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
