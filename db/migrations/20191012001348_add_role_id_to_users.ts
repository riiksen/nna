import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table): void => {
    table.integer('role_id').unsigned();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table): void => {
    table.dropColumn('role_id');
  });
}

