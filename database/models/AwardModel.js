const database = require("../connection");
const DataTypes = require("sequelize");
const Users = require("./UserModel");

const Award = database.define(
  "award",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    award: DataTypes.STRING,
    level: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  }
);

Users.hasMany(Award, { foreignKey: "user_id" });
Award.belongsTo(Users, { foreignKey: "user_id" });

module.exports = Award;
