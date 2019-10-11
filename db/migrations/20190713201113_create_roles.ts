import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('roles', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name').unique();
    table.timestamps();

    table.index('id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('roles');
}
