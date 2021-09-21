'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/database';

export interface VideoAttributes {
  id: number;
  title: string;
  srcImage: string;
  srcVideo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VideoCreationAttributes extends Optional<VideoAttributes, 'id'| 'createdAt' | 'updatedAt'> {

}

interface VideoInstance extends Model<VideoAttributes, VideoCreationAttributes>, VideoAttributes {

}

export const Videos = sequelize.define<VideoInstance>('videos', {
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
  srcVideo: DataTypes.TEXT,
  createdAt:{
    type: 'DATETIME',
  },
  updatedAt:{
      type: 'DATETIME',
  }
})

export default Videos



