const express = require("express");
const foodsRoutes = require("./routes/foodsRoutes");
const Database = require("./database/db");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.json());
app.use("/foods", foodsRoutes);

(async () => {
  await Database.migrate();
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
