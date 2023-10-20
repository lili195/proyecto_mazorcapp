const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('people', {
        id_person: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol_person: {
            type: DataTypes.ENUM('P', 'SU'),
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        password_person: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timeStamps: false,
        createdAt: false,
        updatedAt: false
    })
}