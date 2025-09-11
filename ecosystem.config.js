module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "./backend",
      script: "npm",
      args: "run start",
      env_production: {
        NODE_ENV: "production",
        DATABASE_URL: process.env.DATABASE_URL
      }
    },
    {
      name: "frontend",
      cwd: "./frontend",
      script: "npm",
      args: "run start",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};

