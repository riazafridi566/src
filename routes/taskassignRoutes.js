const express = require("express");
const {
  getassigntask,
  createassigntask,
  createClassBaseTask,
  getUserTask,
  UpdateAssignTask,
  deleteAssignTask,
} = require("../controllers/assigntaskController");
const protect = require("../middlewares/authMiddleware");

const routes = express.Router();

//routes.get("/assigntask",getassigntask)
routes.get("/get-user-task", protect, getUserTask);
//routes.post("/assigntask",createassigntask)
routes.post("/assigntasktoclass", protect, createClassBaseTask);
routes.patch("/updateassigntask/:id", protect, UpdateAssignTask);
routes.delete("/deleteassigntask/:id", protect, deleteAssignTask);

module.exports = routes;
