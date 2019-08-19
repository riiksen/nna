import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (t): void => {
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

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
