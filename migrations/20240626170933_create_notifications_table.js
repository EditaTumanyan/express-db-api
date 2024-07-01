/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('notifications', function(table) {
        table.increments('id').primary(); 
        table.text('email').notNullable(); 
        table.text('text').notNullable(); 
        table.timestamp('scheduleDate').notNullable(); 
        table.boolean('isActive').defaultTo(true); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('notifications');
};


