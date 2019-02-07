import Joi from "joi";

import dotenv from "dotenv";

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  LOGIN_RETURN_URL: Joi.string(),
  STEAM_API_KEY: Joi.string(),
  OPSKINS_API_KEY: Joi.string(),
  OPSKINS_TWOFACTOR_SECRET: Joi.string(),
  SESSION_SECRET: Joi.string(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  sessionSecret: envVars.SESSION_SECRET,
  loginReturnURL: envVars.LOGIN_RETURN_URL,
  steamApiKey: envVars.STEAM_API_KEY,
  opSkinsApiKey: envVars.OPSKINS_API_KEY,
  opSkinsTwoFactorSecret: envVars.OPSKINS_TWOFACTOR_SECRET,
}

export default config;
