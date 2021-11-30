import { MoodSoundAttributes } from './mood_sounds';
'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/database';

export interface SoundAttributes {
  id: number;
  title: string;
  srcImage: string;
  srcSound: string;
  volume: number;
  createdAt?: Date;
  updatedAt?: Date;
  mood_sounds?: MoodSoundAttributes;
}

interface SoundCreationAttributes extends Optional<SoundAttributes, 'id' | 'createdAt' | 'updatedAt'> {

}

interface SoundInstance extends Model<SoundAttributes, SoundCreationAttributes>, SoundAttributes {

}

export const Sounds = sequelize.define<SoundInstance>('sounds', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  srcImage: DataTypes.TEXT,
  srcSound: DataTypes.TEXT,
  volume: DataTypes.INTEGER,
  createdAt:{
    type: 'DATETIME',
  },
  updatedAt:{
      type: 'DATETIME',
  }
})

export default Sounds;

