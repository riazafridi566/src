const CommentModel = require("../database/models/CommentsModel");

const getAllComments = async (req, res) => {
  try {
    const data = await CommentModel.findAll();
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

const createComment = async (req, res) => {
  const { text, user_id, task_sol_id } = req.body;
  try {
    const data = await CommentModel.create({
      text,
      user_id: req.user?.id,
      task_sol_id,
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

const updateComment = async (req, res) => {
  const body = req.body;

  try {
    const data = await CommentModel.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "No data found with id " + req.params.id,
      });
    } else {
      await CommentModel.update({ ...body }, { where: { id: req.params.id } });
      res.status(200).json({
        status: "success",
        message: "Comment updated successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const data = await CommentModel.findByPk(req.params.id);
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "No data found with id " + req.params.id,
      });
    } else {
      await CommentModel.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: "success",
        message: "Comment deleted successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
