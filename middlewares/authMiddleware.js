const jwt = require("jsonwebtoken");
const Users = require("../database/models/UserModel");
const School = require("../database/models/School");
const Role = require("../database/models/Role");
const Task = require("../database/models/Task");

const protect = async (req, res, next) => {
  let token = req.headers["token"];

  try {
    if (!token)
      return res.json({
        message: "no token found",
      });
    if (token) {
      const valid = jwt.verify(token, "my-new-secrete-key-riaz-khan");
      const user = await Users.findByPk(valid?.id, {
        attributes: ["id", "name", "email", "role_id"],
      });
      req.user = user.dataValues;
      // if (!user)
      //   return res.json({
      //     message: "invalid token",
      //   });

      // req.user = user.dataValues;
      // req.token = token;

      next();
    }
  } catch (error) {
    res.json({ message: error });
  }
};
module.exports = protect;
