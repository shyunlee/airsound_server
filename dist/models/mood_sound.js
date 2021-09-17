'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodSound = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
exports.MoodSound = database_1.sequelize.define('mood_sound', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    mood_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sound_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: 'DATETIME',
    },
    updatedAt: {
        type: 'DATETIME',
    }
});
exports.default = exports.MoodSound;
