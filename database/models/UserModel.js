const database = require("../connection");
const DataTypes = require("sequelize");
const School = require("./School");
const Role = require("./Role");
const ClassModel = require("./ClassModel");


const Users = database.define(
  "users",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: { type: DataTypes.BIGINT },
    school_id: { type: DataTypes.BIGINT },
    class_id: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  }
);


Role.hasMany(Users, { foreignKey: "role_id" });
Users.belongsTo(Role, { foreignKey: "role_id" });


ClassModel.hasMany(Users, { foreignKey: "class_id" });
Users.belongsTo(ClassModel, { foreignKey: "class_id" });

School.hasMany(Users, { foreignKey: "school_id" });
Users.belongsTo(School, { foreignKey: "school_id" });

module.exports = Users;