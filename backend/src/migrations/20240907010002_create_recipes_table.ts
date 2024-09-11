import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('recipes', function(table) {
        table.increments("id").primary();
        table.integer("senderId").unsigned().notNullable();
        table.string("name").notNullable();
        table.string("recipe").notNullable();
        table.boolean("vegetarian").notNullable();
        table.date("postDate").notNullable();

        table.foreign("senderId").references("id").inTable("users").onDelete("CASCADE");
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('recipes');
}