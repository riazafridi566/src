const {
  gettask,
  taskcreate,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const express = require("express");
const protect = require("../middlewares/authMiddleware");

const routes = express.Router();

routes.get("/task", protect, gettask);
routes.post("/task", protect, taskcreate);
routes.patch("/updatetask/:id", protect, updateTask);
routes.delete("/deletetask/:id", protect, deleteTask);

module.exports = routes;
