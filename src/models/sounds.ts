'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/database';

interface SoundAttributes {
  id: number;
  title: string;
  src_image: string;
  src_sound: string;
  volume: number;
  createdAt?: Date;
  updatedAt?: Date;
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
  src_image: DataTypes.TEXT,
  src_sound: DataTypes.TEXT,
  volume: DataTypes.INTEGER,
  createdAt:{
    type: 'DATETIME',
  },
  updatedAt:{
      type: 'DATETIME',
  }
})

export default Sounds;

