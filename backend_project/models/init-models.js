var DataTypes = require("sequelize").DataTypes;
var _crops = require("./crops");
var _eventualities = require("./eventualities");
var _eventuality_types = require("./eventuality_types");
var _people = require("./people");
var _trackings = require("./trackings");
var _weatherDatas = require("./weatherDatas");

function initModels(sequelize) {
  var crops = _crops(sequelize, DataTypes);
  var eventualities = _eventualities(sequelize, DataTypes);
  var eventuality_types = _eventuality_types(sequelize, DataTypes);
  var people = _people(sequelize, DataTypes);
  var trackings = _trackings(sequelize, DataTypes);
  var weatherDatas = _weatherDatas(sequelize, DataTypes);

  trackings.belongsTo(crops, { as: "id_crop_crop", foreignKey: "id_crop"});
  crops.hasMany(trackings, { as: "trackings", foreignKey: "id_crop"});

  trackings.belongsTo(eventualities, { as: "id_event_eventuality", foreignKey: "id_event"});
  eventualities.hasMany(trackings, { as: "trackings", foreignKey: "id_event"});

  eventualities.belongsTo(eventuality_types, { as: "id_event_type_eventuality_type", foreignKey: "id_event_type"});
  eventuality_types.hasMany(eventualities, { as: "eventualities", foreignKey: "id_event_type"});

  crops.belongsTo(people, { as: "id_person_person", foreignKey: "id_person"});
  people.hasMany(crops, { as: "crops", foreignKey: "id_person"});

  trackings.belongsTo(people, { as: "id_person_person", foreignKey: "id_person"});
  people.hasMany(trackings, { as: "trackings", foreignKey: "id_person"});
  
  trackings.belongsTo(weatherDatas, { as: "id_datas_weatherData", foreignKey: "id_datas"});
  weatherDatas.hasMany(trackings, { as: "trackings", foreignKey: "id_datas"});

  return {
    crops,
    eventualities,
    eventuality_types,
    people,
    trackings,
    weatherDatas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
