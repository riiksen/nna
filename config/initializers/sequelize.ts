import { Sequelize } from 'sequelize-typescript';
import config from '../config';

const connection = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    dialect: config.db.dialect,
    storage: ':memory:',
    modelPaths: [`${__dirname}/../app/models/*`],
  },
);

export default connection;
