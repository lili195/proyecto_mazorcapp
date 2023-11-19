const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trackings', {
    id_tracking: {
      type: DataTypes.STRING(14),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    id_crop: {
      type: DataTypes.STRING(14),
      allowNull: false,
      references: {
        model: 'crops',
        key: 'id_crop'
      },
      unique: true,
      primaryKey: true,
    },
    id_person: {
      type: DataTypes.STRING(14),
      allowNull: true,
      references: {
        model: 'people',
        key: 'id_person'
      },
      unique: true,
      primaryKey: true,
    },
    id_datas: {
      type: DataTypes.STRING(14),
      allowNull: false,
      references: {
        model: 'weatherDatas',
        key: 'id_datas'
      }
    },
    id_event: {
      type: DataTypes.STRING(14),
      allowNull: true,
      references: {
        model: 'eventualities',
        key: 'id_event'
      }
    },
    date_tracking: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fase_tracking: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dirtState_tracking: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'trackings',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
