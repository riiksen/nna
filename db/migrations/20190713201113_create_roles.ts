import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('roles', (table): void => {
    table.increments();
    table.string('name').unique();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('roles');
}
