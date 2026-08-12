import dotenv from "dotenv";

dotenv.config();

function checkRequiredEnvVariables(key) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing env variables for ${key}`);
  }

  return value;
}

export const env = {
  PORT: process.env.PORT ?? 3000,

  isProduction: (process.env.NODE_ENV ?? "development") === "production",

  nodeEnv: process.env.NODE_ENV ?? "development",

  logLevel: process.env.LOG_LEVEL ?? "info",

  databaseUrl: checkRequiredEnvVariables("DATABASE_URL"),

  jwtAccessSecret: checkRequiredEnvVariables("JWT_SECRET"),

  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
};
