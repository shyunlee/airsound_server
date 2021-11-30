"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_js_1 = require("../config/config.js");
const { username, password, database, host, port } = config_js_1.config.prod;
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    port,
    logging: false,
});
