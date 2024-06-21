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
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
