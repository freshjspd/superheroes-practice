'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HeroPowers extends Model {
    static associate(models) {}
  }
  HeroPowers.init(
    {
      heroId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Hero',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      powerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Power',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      origin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'HeroPowers',
      tableName: 'hero_powers',
      underscored: true,
    }
  );
  return HeroPowers;
};
