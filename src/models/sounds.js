'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Sounds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sounds.init({
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
    volume: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sounds',
  });
  return Sounds;
};