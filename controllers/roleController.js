const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../database/models/Role");

const getRole = async (req, res) => {
  try {
    const data = await Role.findAll();
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error,
    });
  }
};

const rolecreate = async (req, res) => {
  const { role_name } = req.body;

  const data = await Role.create({
    role_name,
  });
  res.status(200).json({ data: data });
};
// update Role
const updateRole = async (req, res) => {
  try {
    const data = await Role.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });
    } else {
      const updateData = await Role.update(
        { role_name: req.body?.role_name },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        status: "success",
        message: "data updated successfully",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error,
    });
  }
};
// delete Role
const deleteRole = async (req, res) => {
  try {
    const data = await Role.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });
    } else {
      const deleteData = await Role.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: "success",
        message: "data deleted successfully",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error,
    });
  }
};

//   user rokhla ao post bonde so comments de agha rokhla
module.exports = {
  getRole,
  rolecreate,
  updateRole,
  deleteRole,
};
