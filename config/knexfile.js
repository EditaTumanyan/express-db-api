const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      port: 5432,
      host: "localhost",
      user: "postgres",
      database: "foods_db",
    },
    migrations: {
      directory: path.resolve(__dirname, "../migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "../seeds"),
    },
  },
};
