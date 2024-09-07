import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table) {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.date("registrationDate").nullable();
        table.json("recipe_ids").nullable();
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}