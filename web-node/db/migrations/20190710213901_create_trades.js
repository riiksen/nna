exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('trades', function(table) {
      table.increments();
      table.integer('state');
      table.integer('user_id').unsigned();
      table.integer('value').unsigned();
      table.enum('type',['deposit', 'withdraw', 'jackpot_bet', 'coinflip_bet']);
      table.integer('offer_id').unsigned();
      table.string('trade_signature');
      table.timestamps();

      table.foreign('user_id').references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('trades')
  ]);
};
