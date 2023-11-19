const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventualities', {
    id_event: {
      type: DataTypes.STRING(14),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    id_event_type: {
      type: DataTypes.STRING(14),
      allowNull: false,
      references: {
        model: 'eventuality_types',
        key: 'id_event_type'
      }
    },
    subtotal_event: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'eventualities',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
