const {
  createAward,
  updateAward,
  deleteAward,
  getAllAward,
} = require("../controllers/AwardController");
const protect = require("../middlewares/authMiddleware");
const express = require("express");

const routes = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callB) => {
    return callB(null, `img-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
const uploadFile = multer({
  storage: storage,
});

routes.get("/Award", protect, getAllAward);
routes.post("/Award", protect, uploadFile.single("image"), createAward);
routes.patch(
  "/Awardupdate/:id",
  protect,
  uploadFile.single("image"),
  updateAward
);
routes.delete("/Awarddelete/:id", protect, deleteAward);

module.exports = routes;
