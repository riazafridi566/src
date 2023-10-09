const database = require("../connection");
const { DataTypes } = require("sequelize");
const User = require("./UserModel");
const Task = require("./Task");

const AssignTask = database.define(
  "assign_task",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    assigned_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    user_id: { type: DataTypes.BIGINT },
    task_id: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  }
);

AssignTask.belongsTo(User, { foreignKey: "user_id" });
AssignTask.belongsTo(Task, { foreignKey: "task_id" });

module.exports = AssignTask;