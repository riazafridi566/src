const {
  getclass,
  createclass,
  deleteClass,
  updateClass,
} = require("../controllers/classController");
const protect = require("../middlewares/authMiddleware");

const express = require("express");

const routes = express.Router();

routes.get("/class", protect, getclass);
routes.post("/class", protect, createclass);
routes.patch("/classupdate/:id", protect, updateClass);
routes.delete("/classdelete/:id", protect, deleteClass);

module.exports = routes;
