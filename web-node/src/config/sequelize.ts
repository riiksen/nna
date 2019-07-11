import { Sequelize } from 'sequelize-typescript';
import { config } from './config';

const connection = new Sequelize({
  database: config.db.database,
  dialect: config.db.dialect,
  username: config.db.username,
  password: '', // config.db.password,
  storage: ':memory:',
  modelPaths: [__dirname + '/../models/*'],
});

export { connection };
