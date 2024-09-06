import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('recipes', function(table) {
        table.increments("id").primary();
        table.integer("senderId").notNullable();
        table.string("name").notNullable();
        table.json("ingredients").nullable();
        table.json("comments").nullable();
        table.integer("likes").nullable();
        table.integer("dislikes").nullable();

        table.foreign("senderId").references("id").inTable("users").onDelete("CASCADE");
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('recipes');
}
