'use strict';
import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '../db/database';
import { SoundAttributes } from './sounds';
import { VideoAttributes } from './videos';

interface MoodAttributes {
  id: number;
  title: string | undefined;
  userId: number
  videoId: number | undefined;
  timer: number;
  sounds?: SoundAttributes[];
  video?: VideoAttributes;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    videoId: DataTypes.INTEGER,
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

