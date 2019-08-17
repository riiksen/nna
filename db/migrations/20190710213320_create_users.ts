import * as Knex from 'knex';

export function up(knex: Knex): any {
  return knex.schema.createTable('users', (t): void => {
    t.increments();
    t.string('username');
    t.string('steamid');
    t.integer('opskins_id').unsigned();
    t.string('avatar');
    t.integer('coins').unsigned();
    t.boolean('locked');
    t.boolean('admin');
    t.boolean('in_trade');
    t.timestamps();
  });
}

export function down(knex: Knex): any {
  return knex.schema.dropTable('users');
}
