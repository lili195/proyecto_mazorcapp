const { Sequelize, Op } = require('sequelize')
const modelPerson = require('../entities/person.js')
const modelCrop = require('../entities/crop.js')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

//const { DB_USER, DB_PASSWORD, DB_HOST } = process.env
// process.env.DATABASE_URL ||
/**const sequelize = new Sequelize(
  process.env.DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/marketplace`,
  {
    logging: false,
    // native: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)*/

/**
 * Create models in database
 */
modelPerson(sequelize)
modelCrop(sequelize)

/**
 * create relationship
 */
const {
  people
} = sequelize.models

const {
  crop
} = sequelize.models

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