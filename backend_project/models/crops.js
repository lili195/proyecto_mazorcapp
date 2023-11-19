const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('crops', {
    id_crop: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    id_person: {
      type: DataTypes.STRING(14),
      allowNull: false,
      references: {
        model: 'people',
        key: 'id_person'
      },
      unique: true,
      primaryKey: true,
    },
    state_crop: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    start_date_crop: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude_crop: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    longitude_crop: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    area_crop: {
      type: DataTypes.REAL,
      allowNull: false
    },
    plants_totalNum_crop: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plants_perM2_crop: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'crops',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
