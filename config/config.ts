import * as Joi from 'joi';

import * as dotenv from 'dotenv';

dotenv.config();

// boilerplate cause joi does not automatically infer a typescript type from a
// joi schema
interface ConfigSchema {
  env: 'development' | 'production' | 'test';
  host: string;
  port: number;
  jwtSecret: string;
  loginReturnURL: string;
  steamApiKey: string;
  opSkinsApiKey: string;
  opSkinsTwoFactorSecret: string;
  db: {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    driver: string;
  };
}

// define validation for all the env vars
// TODO: Redesign this validation cause it is not the best and could be better
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  SERVER_HOST: Joi.string(),
  SERVER_PORT: Joi.number()
    .default(4040),
  LOGIN_RETURN_URL: Joi.string(),
  STEAM_API_KEY: Joi.string(),
  OPSKINS_API_KEY: Joi.string(),
  OPSKINS_TWOFACTOR_SECRET: Joi.string(),
  JWT_SECRET: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string().allow(''),
  DB_DATABASE: Joi.string(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_DIALECT: Joi.string()
    .allow(['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql']),
  DB_DRIVER: Joi.string(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// boilerplate to convert a Joi schema to a typescript type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToConfigSchema(config: any): ConfigSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validate(x: any): x is ConfigSchema {
    return envVarsSchema.validate(x).error === null;
  }

  if (validate(config)) {
    return config;
  }

  // This should never happen
  throw new Error('Error happened while convering config to typescript object');
}

const joiObjectConfig = {
  env: envVars.NODE_ENV,
  host: envVars.SERVER_HOST,
  port: envVars.SERVER_PORT,
  jwtSecret: envVars.JWT_SECRET,
  loginReturnURL: envVars.LOGIN_RETURN_URL,
  steamApiKey: envVars.STEAM_API_KEY,
  opSkinsApiKey: envVars.OPSKINS_API_KEY,
  opSkinsTwoFactorSecret: envVars.OPSKINS_TWOFACTOR_SECRET,
  db: {
    database: envVars.DB_DATABASE,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: envVars.DB_DIALECT,
    driver: envVars.DB_DRIVER,
  },
};

const config = convertToConfigSchema(joiObjectConfig);

export { config };
