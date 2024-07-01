const express = require("express");
const foodsRoutes = require("./routes/foodsRoutes");
const shopsRoutes = require("./routes/shopsRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const Database = require("./database/db");

const { scheduleEmails } = require("./jobs/scheduleEmails");
const emailService = require("./services/emailService");
const { SchemaBuilder } = require("knex");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.json());
app.use("/foods", foodsRoutes);
app.use("/shops", shopsRoutes);
app.use("/notifications", notificationsRoutes);

(async () => {
  await Database.migrate();
})();

scheduleEmails();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
