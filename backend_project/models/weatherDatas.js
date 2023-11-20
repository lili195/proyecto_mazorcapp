const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weatherDatas', {
    id_datas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    temp_datas: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    hum_datas: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    wind_datas: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    cloud_datas: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'weatherDatas',
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
