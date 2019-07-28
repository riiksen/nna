import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('users', (t): void => {
    t.unique(['steamid']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('users', (t): void => {
    t.dropUnique(['steamid']);
  });
}
