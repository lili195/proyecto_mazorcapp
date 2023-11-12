const { Sequelize, Op } = require('sequelize')
const modelPeople = require('../entities/person.js')
const modelCrops = require('../entities/crop.js')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

/**
 * Crear los modelos en la db
 */
modelPeople(sequelize)
modelCrops(sequelize)


module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op
}