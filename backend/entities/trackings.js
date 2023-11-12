const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define('trackings', {
        id_crop: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'crops',
                key: 'id_crop', 
            }
        },
        date_tracking: {
            type: DataTypes.STRING,
			allowNull: false
        },
        fase_tracking: {
            type: DataTypes.ENUM(
                'SIEMBRA', 
                'GERMINACION', 
                'DESARROLLO',
                'FLORACION',
                'GRANULACION',
                'MADURACION',
                'COSECHA'),
			allowNull: false,
        },
        dirtState_tracking: {
            type: DataTypes.ENUM('S', 'H', 'P'),
			allowNull: false,
        },
	}, {
		timeStamps: false,
		createdAt: false,
		updatedAt: false
	});
}