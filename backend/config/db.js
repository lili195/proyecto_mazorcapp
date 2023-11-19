const { Sequelize, Op } = require('sequelize')
const modelPeople = require('../entities/person.js')
const modelCrops = require('../entities/crop.js')
const modelTrackings = require('../entities/trackings.js')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});


/**
 * Crear los modelos en la db
 */

modelPeople(sequelize)
modelCrops(sequelize)
modelTrackings(sequelize)


/**
 * relaciones
 */

// const people = sequelize.models.people;
// const crops = sequelize.models.crops;


module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op
}