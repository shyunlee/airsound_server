'use strict';
import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '../db/database';

interface MoodAttributes {
  id: number;
  title: string;
  user_id: number
  video_id: number;
  timer: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MoodCreationAttributes extends Optional<MoodAttributes, 'id' | 'createdAt' | 'updatedAt'> {

}

interface MoodInstance extends Model<MoodAttributes, MoodCreationAttributes>, MoodAttributes {

}

export const Moods = sequelize.define<MoodInstance>('moods', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING(45),
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    video_id: DataTypes.INTEGER,
    timer: DataTypes.INTEGER,
    createdAt:{
      type: 'DATETIME',
      allowNull: false
    },
    updatedAt:{
        type: 'DATETIME',
        allowNull: false
    }
  },
)

export default Moods;

