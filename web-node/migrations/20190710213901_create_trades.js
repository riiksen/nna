exports.up = function(knex) {
  return Promise.all([  
	  knex.schema.createTable('trades', function(table) {
	    table.increments();
	    table.integer('state');
	    table.integer('recipent_id').unsigned();
	    table.integer('value').unsigned();
	    table.enum('type',['deposit','withdraw','jackpot_bet','coinflip_bet']);
	    table.integer('offer_id').unsigned();
	    table.string('trade_signature');
	    table.timestamps();
	  })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('trades')
  ]);
};
