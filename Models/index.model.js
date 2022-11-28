// const Sequelize = require('sequelize');

const { Sequelize, DataTypes } = require("sequelize");

const data = require("../Config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = data;

db.sequelize.sync({ force: false }).then(() => console.log("sync is done"));

db.students = require("../Models/user.model")(data, DataTypes);


module.exports = db;
