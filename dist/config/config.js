"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
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
};
