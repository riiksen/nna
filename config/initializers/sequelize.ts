import { Sequelize } from 'sequelize-typescript';

import * as models from '@app/models';
import { config } from '../config';

const databaseConnection = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    dialect: config.db.dialect,
    port: config.db.port,
    storage: ':memory:',
    models: Object.values(models),
  },
);

export { databaseConnection };
