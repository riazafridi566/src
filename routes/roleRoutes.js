const {
  getRole,
  rolecreate,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const protect = require("../middlewares/authMiddleware");

const express = require("express");

const routes = express.Router();

routes.get("/role", getRole);
routes.post("/role", rolecreate);
routes.patch("/roleupdate/:id", protect, updateRole);
routes.delete("/roledelete/:id", protect, deleteRole);

module.exports = routes;
