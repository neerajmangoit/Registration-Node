const { Sequelize, DataTypes } = require("sequelize");

const data = require("../config/database");

const db = {};

db.Sequelize = Sequelize;

db.sequelize = data;

db.sequelize.sync({ force: false }).then(() => console.log("sync is done"));

db.students = require("./user.model")(data, DataTypes);

module.exports = db;
