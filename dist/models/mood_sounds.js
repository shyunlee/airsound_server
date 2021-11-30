'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodSound = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
const moods_1 = __importDefault(require("./moods"));
const sounds_1 = __importDefault(require("./sounds"));
exports.MoodSound = database_1.sequelize.define('mood_sounds', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    moodId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: moods_1.default,
            key: 'id'
        }
    },
    soundId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: sounds_1.default,
            key: 'id'
        }
    },
    customVolume: sequelize_1.DataTypes.INTEGER,
    createdAt: {
        type: 'DATETIME',
    },
    updatedAt: {
        type: 'DATETIME',
    }
});
exports.default = exports.MoodSound;
