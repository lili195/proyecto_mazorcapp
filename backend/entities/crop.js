const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define('crops', {
		id_crop: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		state_crop: {
			type: DataTypes.ENUM('A', 'F'),
			allowNull: false,
		},
		start_date_crop: {
			type: DataTypes.STRING,
			allowNull: false
		},
		latitude_crop: {
			type: DataTypes.STRING,
			allowNull: false
		},
		longitude_crop: {
			type: DataTypes.STRING,
			allowNull: false
		},
		area_crop: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		plants_totalNum_crop: {
			type: DataTypes.STRING,
			allowNull: false
		},
		plants_perM2_crop: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		timeStamps: false,
		createdAt: false,
		updatedAt: false
	})
}