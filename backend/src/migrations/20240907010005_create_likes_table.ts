import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('recipe_likes_dislikes', function(table) {
        table.increments("id").primary();
        table.integer("userId").unsigned().notNullable();
        table.integer("likedElementId").unsigned().notNullable();
        table.boolean("likeType").notNullable();
        table.string("likeableType").notNullable();
        
        table.foreign("userId").references("id").inTable("users").onDelete("CASCADE");
        table.foreign("recipeId").references("id").inTable("recipes").onDelete("CASCADE");
        table.unique(["userId", "recipeId"]);
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('recipe_likes_dislikes');
}