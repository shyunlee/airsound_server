'use strict';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database';

export const MoodSound = sequelize.define('mood_sound', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    mood_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sound_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt:{
      type: 'DATETIME',
    },
    updatedAt:{
        type: 'DATETIME',
    }
  },
)

export default MoodSound;
