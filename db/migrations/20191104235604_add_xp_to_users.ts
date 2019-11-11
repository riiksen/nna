import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table): void => {
    table.integer('xp').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table): void => {
    table.dropColumn('xp');
  });
}
