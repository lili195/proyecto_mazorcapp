const { Sequelize, Op } = require('sequelize')
const modelPeople = require('../entities/person.js')
const modelCrops = require('../entities/crop.js')
const modelTrackings = require('../entities/trackings.js')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const queryInterface = sequelize.getQueryInterface();

/**
 * Crear los modelos en la db
 */
modelPeople(sequelize)
modelCrops(sequelize)
modelTrackings(sequelize)

/**
 * corregir pk
 */

// const query = `
// INSERT INTO crops (id_person, state_crop, start_date_crop, latitude_crop, longitude_crop, area_crop, plants_totalNum_crop, plants_perM2_crop)
// VALUES (1234567890, 'A', '2023-11-12', '4.6097100', '-74.0817500', '1000', '10000', '10');
// `;

// sequelize.query(query);


module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op
}