// const { DataTypes } = require('sequelize')

// si lo datos recolectados en un nuevo seguimiento son iguales a
// algunos anteriores, se usa la unformacion que ya está almacenda


// se puede autoincremental

// module.exports = (sequelize) => {
//     sequelize.define('weather_datas', {
//         id_wd: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
// 			autoIncrement: true
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

// if(Template, hum, cien == all from db) {
//     //recuperar el id del que conincido
        //almacenar en el seguimiento
// } else {
    //crear nuevo registro de datos meteoro
    // traer el id del registro
    //almacenar en el seguimiento
//}