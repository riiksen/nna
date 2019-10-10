import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('trades', (t): void => {
    t.increments();
    t.integer('state');
    t.integer('user_id').unsigned();
    t.integer('value').unsigned();
    t.enum('type', ['deposit', 'withdraw', 'jackpot_bet', 'coinflip_bet']);
    t.integer('offer_id').unsigned();
    t.string('trade_signature');
    t.timestamps();

    t.foreign('user_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('trades');
}
