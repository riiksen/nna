import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('role_permissions', (table: any) => {
      table.integer('role_id').unsigned().notNullable();
      table.integer('permission_id').unsigned().notNullable();

      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade');
      table.foreign('permission_id').references('id').inTable('permissions').onDelete('cascade');

      table.unique(['role_id', 'permission_id']);
      table.primary(['role_id', 'permission_id']);

      table.timestamps();

      table.index(['role_id', 'permission_id']);
    }),
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.dropTable('role_permissions'),
  ]);
}
