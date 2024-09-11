import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("comments_likes", function(table) {
        table.increments("id").primary();
        table.integer("userId").unsigned().notNullable();
        table.integer("commentId").unsigned().notNullable();
        table.boolean("likeType").notNullable();

        table.foreign("userId").references("id").inTable("users").onDelete("CASCADE");
        table.foreign("commentId").references("id").inTable("comments").onDelete("CASCADE");
        table.unique(["userId", "commentId"]);
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("comments_likes");
}