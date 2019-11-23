import { Sequelize } from 'sequelize-typescript';

import * as models from '@app/models';
import { config } from '../config';

const databaseConnection = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    dialect: config.db.dialect,
    storage: ':memory:',
    models: Object.values(models),
  },
);

export { databaseConnection };
