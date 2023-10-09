const {
  getAllUsers,
  usercreate,
  Loginuser,
  LogoutUser,
  UpdateUser,
  deleteUser,
} = require("../controllers/userController");

const express = require("express");
const protect = require("../middlewares/authMiddleware");
const adminrole = require("../middlewares/roleMiddleware");

const routes = express.Router();

routes.get("/users", protect, getAllUsers);

routes.get("/logout-user", LogoutUser);
routes.patch("/userupdate/:id", protect, adminrole(2), UpdateUser);
routes.delete("/userdelete/:id", protect, adminrole(2), deleteUser);

routes.post("/users", protect, usercreate);
routes.post("/login-user", Loginuser);

module.exports = routes;
