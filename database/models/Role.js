const database = require("../connection");
const DataTypes = require("sequelize");


const Role = database.define(
  "role",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    role_name: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);


module.exports = Role;