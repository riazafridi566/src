const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AssignTask = require("../database/models/assigntask");
const Task = require("../database/models/Task");
const Users = require("../database/models/UserModel");

const getUserTask = async (req, res) => {
  try {
    const data = await AssignTask.findAll({
      where: { user_id: req.user?.id },

      include: [{ model: Task }],
    });
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

// const getassigntask = async (req, res) => {
//   try {
//       const data = await AssignTask.findAll({
//           include: [

//             {
//                   model: Task,
//                   attributes:["task_name","description"]
//               },
//               {
//                   model: Users,
//                  attributes:["name","email"]
//               }
//           ]
//       });
//       res.json({
//           status: "success",
//           data
//       });
//   } catch (error) {
//       res.json({
//           status: "fail",
//           message: error
//       });
//   }
// }

// const  getassigntask=async(req,res)=>{
//     try {
//         const data=await AssignTask.findAll()
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
//}

//creat class base task assign

const createClassBaseTask = async (req, res) => {
  const { assigned_date, due_date, task_id, class_id } = req.body;

  try {
    const allUsers = await Users.findAll({ where: { class_id } }); // Assuming you have a model named User

    const data = allUsers.map(async (user) => {
      return await AssignTask.create({
        assigned_date,
        due_date,
        user_id: user.id,
        task_id: task_id,
      });
    });

    return res.status(200).json({ data: "assign task successfully" });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

// single user task assign
// const createassigntask = async (req, res) => {

//   const { assigned_date,due_date,user_id,task_id} = req.body;

//     const data = await AssignTask.create({
//       assigned_date,
//       due_date,
//       user_id,
//       task_id

//     });

//   res.status(200).json({ data: data });
// }
//   update Users
const UpdateAssignTask = async (req, res) => {
  try {
    const data = await AssignTask.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    } else {
      await AssignTask.update(
        { ...req.body },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({ message: "Data updated" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete
const deleteAssignTask = async (req, res) => {
  try {
    const data = await AssignTask.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    } else {
      await AssignTask.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: "Data deleted" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  //getassigntask,
  // createassigntask,
  createClassBaseTask,
  getUserTask,
  UpdateAssignTask,
  deleteAssignTask,
  //  classBase_Task
};
