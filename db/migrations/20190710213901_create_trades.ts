import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('trades', (table): void => {
    table.increments();
    table.integer('state');
    table.integer('user_id').unsigned();
    table.integer('value').unsigned();
    table.enum('type', ['deposit', 'withdraw', 'jackpot_bet', 'coinflip_bet']);
    table.integer('offer_id').unsigned();
    table.string('trade_signature');
    table.timestamps();

    table.foreign('user_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('trades');
}
