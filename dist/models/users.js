'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
const Users = database_1.sequelize.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    srcImage: sequelize_1.DataTypes.STRING(128),
    authProvider: sequelize_1.DataTypes.STRING(45),
    createdAt: {
        type: 'DATETIME',
        allowNull: false
    },
    updatedAt: {
        type: 'DATETIME',
    }
});
exports.default = Users;
