const database = require("../connection");
const DataTypes = require("sequelize");
const Users = require("./UserModel");
const AssignTaskSolution = require("./TaskSolution");

const CommentModel = database.define(
  "comment",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
    task_sol_id: { type: DataTypes.BIGINT },
    user_id: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  }
);

AssignTaskSolution.hasMany(CommentModel, { foreignKey: "task_sol_id" });
CommentModel.belongsTo(AssignTaskSolution, { foreignKey: "task_sol_id" });
Users.hasMany(CommentModel, { foreignKey: "user_id" });
CommentModel.belongsTo(Users, { foreignKey: "user_id" });

module.exports = CommentModel;
