const knex = require("knex");
const knexfile = require("../config/knexfile");

class Database {
  constructor(config) {
    this.knexInstance = knex(config);
  }

  async migrate() {
    try {
      await this.knexInstance.migrate.latest();
      console.log("Database is ready");
    } catch (error) {
      console.error("Error setting up database:", error.message);
      process.exit(1);
    }
  }
  getInstance() {
    return this.knexInstance;
  }
}

module.exports = new Database(knexfile.development);
