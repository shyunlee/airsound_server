'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moods = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
exports.Moods = database_1.sequelize.define('moods', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: sequelize_1.DataTypes.STRING(45),
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    videoId: sequelize_1.DataTypes.INTEGER,
    timer: sequelize_1.DataTypes.INTEGER,
    createdAt: {
        type: 'DATETIME',
        allowNull: false
    },
    updatedAt: {
        type: 'DATETIME',
        allowNull: false
    }
});
exports.default = exports.Moods;
