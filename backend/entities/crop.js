const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define('crop', {
		id_crop: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		start_date: {
			type: DataTypes.STRING,
			allowNull: false
		},
		latitude: {
			type: DataTypes.STRING,
			allowNull: false
		},
		longitude: {
			type: DataTypes.STRING,
			allowNull: false
		},
		altitude: {
			type: DataTypes.STRING,
			allowNull: false
		},
		area: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		plants_num: {
			type: DataTypes.STRING,
			allowNull: false
		},
		plants_m2: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		timeStamps: false,
		createdAt: false,
		updatedAt: false
	})
}