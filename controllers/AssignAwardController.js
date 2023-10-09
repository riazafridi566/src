const AssignAward = require("../database/models/AssignAwardModel");
const Users = require("../database/models/UserModel");
const TaskSolutionModel = require("../database/models/TaskSolution");

// create assignAward
const createAssignAward = async (req, res) => {
  try {
    const taskSol = await TaskSolutionModel.findAll({
      where: { user_id: req.user?.id },
    });

    if ((taskSol.length = 5)) {
      await AssignAward.create({ user_id: req.user?.id, award_id: 1 });

      return res
        .status(200)
        .json({ message: "Congratulations! You have won the award." });
    }
    if ((taskSol.length = 10)) {
      await AssignAward.create({ id: req.user?.id, award_id: 2 });
      return res
        .status(200)
        .json({ message: "Congratulations! You have won the award." });
    }
    if ((taskSol.length = 16)) {
      await AssignAward.create({ id: req.user?.id, award_id: 3 });
      return res
        .status(200)
        .json({ message: "Congratulations! You have won the award." });
    }

    return res.status(200).json({ message: "No award assigned." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// get all assignAward
const getAllAssignAward = async (req, res) => {
  try {
    const data = await AssignAward.findAll();
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get single assignAward
const getSingleAssignAward = async (req, res) => {
  try {
    const data = await AssignAward.findByPk(req.params.id);
    if (!data) return res.status(400).json({ message: "No data found" });
    else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get user assignaward
const getUserAssignAwards = async (req, res) => {
  try {
    const data = await AssignAward.findAll({
      where: { user_id: req.user?.id },
    });
    if (!data) return res.status(400).json({ message: "No data found" });
    else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// display highest rank award
const displayAward = async (req, res) => {
  try {
    const data = await AssignAward.findOne({
      order: [["id", "DESC"]],
    });
    console.log("Last row:", data?.get());
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAssignAward,
  getAllAssignAward,
  getSingleAssignAward,
  getUserAssignAwards,
  displayAward,
};
