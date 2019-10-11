import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('permissions', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name').notNullable().unique();

    table.timestamps();

  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('permissions');
}
