import { config } from './config/config';

export = {
  client: config.db.driver,
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  },
  migrations: {
    table: 'migrations',
    directory: './db/migrations/',
  },
  seeds: {
    directory: './db/seeds/',
  },
};
