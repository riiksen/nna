import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('roles', (table:any) => {
      table.increments();
      table.string('name').unique();
      table.timestamps();

      table.index('id');
    })
  ]);
}


export async function down(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.dropTable('roles')
  ]);
}

