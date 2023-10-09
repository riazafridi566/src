const database = require("../connection");
const DataTypes = require("sequelize");

const School = database.define(
  "school",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    school_name: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports =School;

