const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");
const protect = require("../middlewares/authMiddleware");
const express = require("express");

const routes = express.Router();

routes.get("/comment", protect, getAllComments);
routes.post("/comment", protect, createComment);
routes.patch("/commentupdate/:id", protect, updateComment);
routes.delete("/commentdelete/:id", protect, deleteComment);

module.exports = routes;
