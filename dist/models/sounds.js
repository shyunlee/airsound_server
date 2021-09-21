'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sounds = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
exports.Sounds = database_1.sequelize.define('sounds', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    srcImage: sequelize_1.DataTypes.TEXT,
    srcSound: sequelize_1.DataTypes.TEXT,
    volume: sequelize_1.DataTypes.INTEGER,
    createdAt: {
        type: 'DATETIME',
    },
    updatedAt: {
        type: 'DATETIME',
    }
});
exports.default = exports.Sounds;
