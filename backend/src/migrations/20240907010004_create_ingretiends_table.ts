import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('ingredients', function(table) {
        table.increments("id").primary();
        table.integer("recipeId").unsigned().notNullable();
        table.string("name").notNullable();
        table.integer("weight").notNullable();

        table.foreign("recipeId").references("id").inTable("recipes").onDelete("CASCADE");
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('ingredients');
}