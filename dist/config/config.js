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
        username: getEnvData('RDS_DB_USER'),
        password: getEnvData('RDS_DB_PASSWORD'),
        database: getEnvData('RDS_DB_NAME'),
        host: getEnvData('RDS_DB_HOST'),
        dialect: "mysql",
        port: 3306
    },
    bcrypt: {
        saltRounds: parseInt(getEnvData('BCRYPT_SALT_ROUNDS', 10))
    },
    jwt: {
        secretKey: getEnvData('JWT_SECRET_KEY'),
        expiredInSec: parseInt(getEnvData('JWT_EXPIRES_SEC'))
    },
    default: {
        timer: 3600
    },
    cors: {
        allowOrigin: getEnvData('CORS_ALLOW_ORIGIN')
    },
    github: {
        clientID: getEnvData('GITHUB_CLIENT_ID'),
        secretKey: getEnvData('GITHUB_CLIENT_SECRET')
    },
    google: {
        clientID: getEnvData('GOOGLE_CLIENT_ID'),
        secretKey: getEnvData('GOOGLE_CLIENT_SECRET')
    },
    oAuth: {
        redirectURI: getEnvData('REDIRECT_URI')
    }
};
