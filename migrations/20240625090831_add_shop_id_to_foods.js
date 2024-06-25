/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('foods', function(table) {
        table.integer('shop_id').unsigned().references('id').inTable('shops');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('foods', function(table) {
        table.dropColumn('shop_id');
      });
};
