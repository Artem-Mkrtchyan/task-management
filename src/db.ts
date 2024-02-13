import { Sequelize } from "sequelize-typescript";
import { models } from "./models/index.js";

export const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    models
});