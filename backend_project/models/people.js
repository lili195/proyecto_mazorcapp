const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('people', {
    id_person: {
      type: DataTypes.STRING(14),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name_person: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    number_person: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    password_person: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'people',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
