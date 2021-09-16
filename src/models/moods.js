'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Moods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Moods.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING(45),
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    videoId: DataTypes.INTEGER,
    timer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'moods',
  });
  return Moods;
};