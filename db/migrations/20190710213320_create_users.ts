import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('username');
    table.string('steamid');
    table.integer('opskins_id').unsigned();
    table.string('avatar');
    table.integer('coins').unsigned();
    table.boolean('locked');
    table.integer('role_id').unsigned();
    table.boolean('in_trade');
    table.timestamps();

  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users');
}
