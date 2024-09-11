import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('comments', function(table) {
        table.increments("id").primary();
        table.integer("recipeId").unsigned().notNullable();
        table.integer("senderId").unsigned().notNullable();
        table.string("content").notNullable();

        table.foreign("senderId").references("id").inTable("users").onDelete("CASCADE");
        table.foreign("recipeId").references("id").inTable("recipes").onDelete("CASCADE");
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('comments');
}
