'use strict';
import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '../db/database';
import Moods from './moods';
import Sounds from './sounds';

export interface MoodSoundAttributes {
  id: number;
  moodId: number;
  soundId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MoodSoundCreationAttributes extends Optional<MoodSoundAttributes, 'id' | 'createdAt' | 'updatedAt'> {

}

interface MoodSoundInstance extends Model<MoodSoundAttributes, MoodSoundCreationAttributes>, MoodSoundAttributes {

}

export const MoodSound = sequelize.define<MoodSoundInstance>('mood_sounds', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    moodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: Moods,
        key:'id'
      }
    },
    soundId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: Sounds,
        key: 'id'
      }
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
