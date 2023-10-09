const database = require("../connection");
const DataTypes = require("sequelize");
const User = require("./UserModel");
const AssignTask = require("./assigntask");

const AssignTaskSolution = database.define(
  "assign_task_solution",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    image: DataTypes.STRING,
    user_id: { type: DataTypes.BIGINT },
    assign_task_id: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  }
);

AssignTaskSolution.belongsTo(AssignTask, { foreignKey: "assign_task_id" });
AssignTaskSolution.belongsTo(User, { foreignKey: "user_id" });

module.exports = AssignTaskSolution;
