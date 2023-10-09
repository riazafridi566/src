const database = require("../connection");
const DataTypes = require("sequelize");


const ClassModel = database.define(
  "class",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    class_name: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);


module.exports = ClassModel;