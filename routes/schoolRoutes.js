const {
  getSchoolinfo,
  schoolcreate,
  getAllSchoolsTeachers,
  getAllSchoolsStudents,
  deleteSchool,
  updateSchool,
} = require("../controllers/schoolController");

const express = require("express");
const protect = require("../middlewares/authMiddleware");

const routes = express.Router();

routes.get("/school", protect, getSchoolinfo);
routes.get("/schoolallteachers/:id", protect, getAllSchoolsTeachers);
routes.get("/schoolallstudents/:id", protect, getAllSchoolsStudents);
routes.post("/school", protect, schoolcreate);
routes.delete("/schooldelete/:id", protect, deleteSchool);
routes.patch("/schoolupdate/:id", protect, updateSchool);

module.exports = routes;
