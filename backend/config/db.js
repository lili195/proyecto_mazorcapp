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

/**
 * crear las relaciones
 */



// modelCrops.belongsTo(modelPeople, { foreignKey: 'id_person' });

// const people = sequelize.define('people')

// const crops = sequelize.define('crops')

// crops.belongsTo(people)
// people.hasMany(crops)

// collection.belongsTo(category)
// category.hasMany(collection)

// user.hasMany(collection)
// collection.belongsTo(user)

// collection.hasMany(nft)
// nft.belongsTo(collection)
// user.hasMany(nft)
// nft.belongsTo(user)

// user.belongsToMany(nft, { through: shoppingCar })
// nft.belongsToMany(user, { through: shoppingCar })

// user.belongsToMany(nft, { through: favorite })
// nft.belongsToMany(user, { through: favorite })

// user.belongsToMany(nft, { through: like })
// nft.belongsToMany(user, { through: like })

// user.belongsToMany(nft, { through: order })
// nft.belongsToMany(user, { through: order })s

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op
}