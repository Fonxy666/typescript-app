import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('comments', function(table) {
        table.increments("id").primary();
        table.string("senderId").notNullable();
        table.json("comment").nullable();

        table.foreign("senderId").references("id").inTable("users");
    });
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('comments');
}
