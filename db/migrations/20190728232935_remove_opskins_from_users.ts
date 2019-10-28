import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (t): void => {
    t.dropColumn('opskins_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (t): void => {
    t.integer('opskins_id').unsigned();
  });
}
