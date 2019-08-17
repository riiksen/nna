import * as Knex from 'knex';

export function up(knex: Knex): any {
  return knex.schema.table('users', (t): void => {
    t.unique(['steamid']);
  });
}

export function down(knex: Knex): any {
  return knex.schema.table('users', (t): void => {
    t.dropUnique(['steamid']);
  });
}
