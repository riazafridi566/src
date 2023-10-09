const {
  getSolution,
  taskcreatesolution,
  updateTaskSolution,
  deleteTaskSolution,
} = require("../controllers/TaskSolutionController");
const multer = require("multer");

const express = require("express");
const protect = require("../middlewares/authMiddleware");

const routes = express.Router();

const storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, callB) => {
    return callB(null, `img-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
const uploadFile = multer({
  storage: storage,
});

routes.post(
  "/solution",
  protect,
  uploadFile.single("image"),
  taskcreatesolution
);
routes.get("/gettasksolution", protect, getSolution);
routes.patch(
  "/updatesolution/:id",
  protect,
  uploadFile.single("image"),
  updateTaskSolution
);
routes.delete("/deletesolution/:id", protect, deleteTaskSolution);

module.exports = routes;
