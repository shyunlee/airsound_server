'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Videos = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
exports.Videos = database_1.sequelize.define('videos', {
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
    src_image: sequelize_1.DataTypes.TEXT,
    src_video: sequelize_1.DataTypes.TEXT,
    createdAt: {
        type: 'DATETIME',
    },
    updatedAt: {
        type: 'DATETIME',
    }
});
exports.default = exports.Videos;
