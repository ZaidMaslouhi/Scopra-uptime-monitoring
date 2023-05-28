const fs = require("fs");
const path = require("path");

// Helper function to load environment variables from .env file
function loadEnvVariables(filePath) {
  const envFile = fs.readFileSync(filePath, "utf8");
  const envVariables = {};

  envFile.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    envVariables[key] = value;
  });

  return envVariables;
}

module.exports = {
  apps: [
    {
      name: "User Service",
      watch: true,
      script: "./user-service/src/index.js",
      env_development: {
        NODE_ENV: "development",
        ...loadEnvVariables(path.resolve(__dirname, "user-service/.env.dev")),
      },
      env_production: {
        NODE_ENV: "production",
        ...loadEnvVariables(path.resolve(__dirname, "user-service/.env")),
      },
    },
    {
      name: "Project Service",
      watch: true,
      script: "./project-service/src/index.js",
      env_development: {
        NODE_ENV: "development",
        ...loadEnvVariables(
          path.resolve(__dirname, "project-service/.env.dev")
        ),
      },
      env_production: {
        NODE_ENV: "production",
        ...loadEnvVariables(path.resolve(__dirname, "project-service/.env")),
      },
    },
    {
      name: "Monitor Service",
      watch: true,
      script: "./monitor-service/src/index.js",
      exec_mode: "cluster",
      instances: 2,
      env_development: {
        NODE_ENV: "development",
        ...loadEnvVariables(
          path.resolve(__dirname, "monitor-service/.env.dev")
        ),
      },
      env_production: {
        NODE_ENV: "production",
        ...loadEnvVariables(path.resolve(__dirname, "monitor-service/.env")),
      },
    },
  ],
};
