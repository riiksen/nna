import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('trades', (table): void => {
    table.dropColumn('type');
    table.integer('type');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('trades', (table): void => {
    table.dropColumn('type');
  });
}
