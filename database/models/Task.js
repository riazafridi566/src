const database = require("../connection");
const DataTypes = require("sequelize");
const Users = require("./UserModel");

const Task = database.define(
  "task",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    task_name: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  }
);

Users.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(Users, { foreignKey: "user_id" });

module.exports = Task;