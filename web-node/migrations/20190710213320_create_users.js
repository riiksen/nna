
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username');
      table.string('steamid');
      table.integer('opskins_id').unsigned();
      table.string('avatar');
      table.integer('coins').unsigned();
      table.boolean('locked');
      table.boolean('admin');
      table.boolean('in_trade');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
