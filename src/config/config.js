import dotenv from 'dotenv'
dotenv.config()

export const config = {
  dev: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "airsound_dev",
    host: "localhost",
    dialect: "mysql",
    port: 3306
  },
  prod: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
  }
}
