const AwardModel = require("../database/models/AwardModel");

const getAllAward = async (req, res) => {
  try {
    const data = await AwardModel.findAll();
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
const createAward = async (req, res) => {
  console.log(req.user);
  const { award, level, image, user_id } = req.body;
  const file = req.file.filename;
  try {
    const data = await AwardModel.create({
      award,
      user_id: req.user?.id,
      level,
      image: file,
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
// Update award
const updateAward = async (req, res) => {
  console.log(req.params);
  const { award, level, image, user_id } = req.body;
  const file = req.file.filename;
  try {
    const award = await AwardModel.findByPk(req.params.id);
    if (!award) {
      return res.status(404).json({
        status: "fail",
        message: "award not found",
      });
    }

    const updateData = await AwardModel.update(
      { image: req.file.filename },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ data: "award updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
const deleteAward = async (req, res) => {
  console.log(req.params);
  try {
    const data = await AwardModel.findByPk(req.params.id);
    console.log(data);
    if (!data)
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });
    else {
      await AwardModel.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: "success",
        message: "award deleted successfully",
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
  createAward,
  updateAward,
  deleteAward,
  getAllAward,
};
