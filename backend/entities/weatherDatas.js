// const { DataTypes } = require('sequelize')

// module.exports = (sequelize) => {
//     sequelize.define('weather_datas', {
//         id_wd: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
// 			autoIncrement: true
//         },
//         id_tracking: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'trackings',
//                 key: 'id_tracking', 
//             }
//         },
//         temp_wd: {
//             type:DataTypes.INTEGER,
//             allowNull: false,
//         },
//         hum_wd: {
//             type:DataTypes.INTEGER,
//             allowNull: false,
//         },
//         wind_wd: {
//             type: DataTypes.STRING,
// 			allowNull: false
//         },
//         rainfall_wd: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false
//         },

//     }, {
// 		timeStamps: false,
// 		createdAt: false,
// 		updatedAt: false
// 	});
// }