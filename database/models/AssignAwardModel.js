const database = require("../connection");
const DataTypes = require("sequelize");
const Users = require("./UserModel");
const Award = require("./AwardModel");

const AssignAwardModel = database.define(
  "assignawardmodel",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.BIGINT },
    award_id: DataTypes.BIGINT,
  },
  {
    timestamps: false,
  }
);

Users.hasMany(AssignAwardModel, { foreignKey: "user_id" });
AssignAwardModel.belongsTo(Users, { foreignKey: "user_id" });

Award.hasMany(AssignAwardModel, { foreignKey: "award_id" });
AssignAwardModel.belongsTo(Award, { foreignKey: "award_id" });

module.exports = AssignAwardModel;
