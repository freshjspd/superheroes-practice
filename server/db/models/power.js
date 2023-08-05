'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Power extends Model {
    // Если у модели связи есть дополнительные свойства,
    // то нужно явно создавать дополнительную модельку,
    // в которой указывать внешние ключи
    static associate(models) {
      Power.belongsToMany(models.Hero, {
        through: models.HeroPowers,
        foreignKey: 'powerId',
      });
    }
  }
  Power.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullDescription: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Power',
      underscored: true,
    }
  );
  return Power;
};
