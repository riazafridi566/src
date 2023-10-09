const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ClassModel = require("../database/models/ClassModel");
const Users = require("../database/models/UserModel");

const getclass = async (req, res) => {
  try {
    const data = await ClassModel.findAll({
      include: [{ model: Users }],
    });
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
// const  getclass=async(req,res)=>{
//     try {
//         const data=await ClassModel.findAll()
//         res.json({
//             status:"success",
//             data
//         })
//     } catch (error) {
//         res.json({
//             status:"fail",
//             message:error
//         })
//     }
// }

const createclass = async (req, res) => {
  const { class_name } = req.body;

  const data = await ClassModel.create({
    class_name,
  });
  res.status(200).json({ data: data });
};
//update class
const updateClass = async (req, res) => {
  try {
    const data = await ClassModel.findByPk(req.params.id);
    if (!data)
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });
    else {
      const updateData = await ClassModel.update(
        { class_name: req.body?.class_name },
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
//delete class
const deleteClass = async (req, res) => {
  try {
    const data = await ClassModel.findByPk(req.params.id);
    if (!data)
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });
    else {
      const deleteData = await ClassModel.destroy({
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

//  post bonde so comments de agha rokhla
module.exports = {
  getclass,
  createclass,
  deleteClass,
  updateClass,
};
