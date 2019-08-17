import * as Knex from 'knex';

export function up(knex: Knex): any {
  return knex.schema.table('users', (t): void => {
    t.dropColumn('opskins_id');
  });
}

export function down(knex: Knex): any {
  return knex.schema.table('users', (t): void => {
    t.integer('opskins_id').unsigned();
  });
}
