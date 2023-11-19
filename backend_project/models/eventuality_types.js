const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventuality_types', {
    id_event_type: {
      type: DataTypes.STRING(14),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name_event_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    descrip_event_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cost_event_type: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'eventuality_types',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
