const Task = require("../database/models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AssignTask = require("../database/models/assigntask");
const User = require("../database/models/UserModel");
const TaskSolution = require("../database/models/TaskSolution");

const getSolution = async (req, res) => {
  try {
    const data = await TaskSolution.findAll({
      include: [{ model: AssignTask, include: [{ model: Task }] }],
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.json({
      status: "fail",
      message: error,
    });
  }
};
const taskcreatesolution = async (req, res) => {
  const { assign_task_id, image, user_id } = req.body;
  const file = req.file.filename;
  try {
    const data = await TaskSolution.create({
      assign_task_id,
      image: file,
      user_id: req.user?.id,
    });

    res.status(200).json({ data: " task  submitted successfully" });
  } catch (error) {
    res.json({
      status: "fail",
      message: error,
    });
  }
};

// Update Task Solution Status
const updateTaskSolution = async (req, res) => {
  const { assign_task_id, image, user_id } = req.body;
  const file = req.file.filename;
  try {
    const taskSolution = await TaskSolution.findByPk(req.params.id);
    if (!taskSolution) {
      return res.status(404).json({
        status: "fail",
        message: "Task solution not found",
      });
    }

    const updateData = await taskSolution.update(
      { image: req.file.filename },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ data: "Task solution updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

const deleteTaskSolution = async (req, res) => {
  console.log(req.params);
  try {
    const data = await TaskSolution.findByPk(req.params.id);
    console.log(data);
    if (!data)
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });
    else {
      await TaskSolution.destroy({
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

module.exports = {
  getSolution,
  taskcreatesolution,
  deleteTaskSolution,
  updateTaskSolution,
};
