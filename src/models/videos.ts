'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/database';

interface VideoAttributes {
  id: number;
  title: string;
  src_image: string;
  src_video: string;
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
  src_image: DataTypes.TEXT,
  src_video: DataTypes.TEXT,
  createdAt:{
    type: 'DATETIME',
  },
  updatedAt:{
      type: 'DATETIME',
  }
})

export default Videos



