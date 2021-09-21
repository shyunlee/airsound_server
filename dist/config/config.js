"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnvData = (key, defaultValue = undefined) => {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error('key (${key}) is undefined');
    }
    return value;
};
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
    },
    bcrypt: {
        saltRounds: parseInt(getEnvData('BCRYPT_SALT_ROUNDS', 10))
    },
    jwt: {
        secretKey: getEnvData('JWT_SECRET_KEY'),
        expiredInSec: parseInt(getEnvData('JWT_EXPIRES_SEC'))
    }
};
