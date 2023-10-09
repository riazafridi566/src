const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../database/models/Task");
const Users = require("../database/models/UserModel");

const gettask = async (req, res) => {
  console.log(req.user);
  try {
    const data = await Task.findAll({
      include: {
        model: Users,
      },
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

// const gettask=async(req,res)=>{
//   try {
//       const data=await Task.findAll({
//         include:[{model:Users}]
//       })
//       res.json({
//           status:"success",
//           data
//       })
//   } catch (error) {
//       res.json({
//           status:"fail",
//           message:error
//       })
//   }
// }

// const gettask=async(req,res)=>{
//     try {
//         const data=await Task.findAll()
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

const taskcreate = async (req, res) => {
  const { task_name, description, user_id } = req.body;

  const data = await Task.create({
    task_name,
    description,
    user_id: req.user?.id,
  });
  res.status(200).json({ data: data });
};
const updateTask = async (req, res) => {
  const body = req.body;

  try {
    const data = await Task.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "No data found with id " + req.params.id,
      });
    } else {
      await Task.update({ ...body }, { where: { id: req.params.id } });
      res.status(200).json({
        status: "success",
        message: "Data updated successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const data = await Task.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "No data found with id " + req.params.id,
      });
    } else {
      await Task.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: "success",
        message: "Data deleted successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//  post bonde so comments de agha rokhla
module.exports = {
  gettask,
  taskcreate,
  updateTask,
  deleteTask,
};
