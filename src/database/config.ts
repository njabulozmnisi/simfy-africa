import dotenv from "dotenv";
dotenv.config();

const Sequelize = require("sequelize");

const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const host = process.env.DATABASE_HOST;
const dialect = process.env.DATABASE_DRIVER;

const sequelizeContext = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  logging: false,
});

export default sequelizeContext;
