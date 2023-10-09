const {
  createAssignAward,
  getAllAssignAward,
} = require("../controllers/AssignAwardController");
const express = require("express");
const protect = require("../middlewares/authMiddleware");

const routes = express.Router();

routes.get("/assignaward", protect, getAllAssignAward);

routes.post("/assignaward", protect, createAssignAward);

module.exports = routes;
