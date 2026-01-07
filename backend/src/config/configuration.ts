export const configuration = () => ({
  app: {
    port: parseInt(process.env.PORT || "3001", 10),
    globalPrefix: process.env.GLOBAL_PREFIX || "api",
    managerPhone: process.env.MANAGER_PHONE || ""
  },
  branches: {
    defaultBranchId: process.env.DEFAULT_BRANCH_ID || "main",
    defaultBranchName: process.env.DEFAULT_BRANCH_NAME || "Main Branch"
  },
  database: {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "puffy",
    password: process.env.DB_PASSWORD || "puffy",
    name: process.env.DB_NAME || "puffy_paty_dev",
    logging: (process.env.DB_LOGGING || "false") === "true",
    synchronize: (process.env.DB_SYNCHRONIZE || "true") === "true"
  },
  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "2h"
  },
  sms: {
    username: process.env.MELLI_USERNAME || "",
    password: process.env.MELLI_PASSWORD || "",
    from: process.env.MELLI_FROM || "",
    mock: (process.env.SMS_MOCK || "false") === "true"
  },
  throttling: {
    ttl: parseInt(process.env.THROTTLE_TTL || "60", 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || "5", 10)
  }
});
