import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('trades', (table): void => {
    table.integer('type');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('trades', (table): void => {
    table.enum('type', ['deposit', 'withdraw', 'jackpot_bet', 'coinflip_bet']);
  });
}
