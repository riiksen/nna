// Update with your config settings.
const config = require('./dist/config/config').default;

module.exports = {
  client: 'pg',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  },
  migrations: {
    table: 'migrations',
    directory: './migrations/'
  },
  seeds: {
    directory: './seeds/'
  }
};
