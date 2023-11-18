const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define('trackings', {
        id_tracking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id_crop: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'crops',
                key: 'id_crop', 
            }
        },
        id_person: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'people',
                key: 'id_person', 
            },
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