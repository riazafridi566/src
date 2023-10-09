const Users = require("../database/models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../database/models/Role");
const School = require("../database/models/School");
const ClassModel = require("../database/models/ClassModel");
const { model } = require("../database/connection");

const getAllUsers = async (req, res) => {
  try {
    const data = await Users.findAll({
      attributes: ["name", "email"],
      include: [
        {
          model: Role,
          attributes: ["role_name"],
        },
        {
          model: ClassModel,
          attributes: ["class_name"],
        },
        {
          model: School,
          attributes: ["school_name"],
        },
      ],
    });
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error,
    });
  }
};

// const getAllUsers=async(req,res)=>{
//   try {
//       const data=await Users.findAll()
//       res.json({
//           status:"success",
//           data
//       })
//   } catch (error) {
//       res.json({
//           status:"fail",
//           message:error
//       })
//   }
// }
const Loginuser = async (req, res) => {
  const { email, password, role_id } = req.body;

  const user = await Users.findOne({ where: { email, role_id } });

  if (!user) return res.json({ status: "fail", message: "wrong credentials" });

  const compare = await bcrypt.compare(password, user.password);

  if (!compare)
    return res.json({ status: "fail", message: "wrong credentials" });

  const token = await jwt.sign(
    { id: user.id },
    "my-new-secrete-key-riaz-khan",
    { expiresIn: "1h" }
  );

  res.status(200).json({ data: user, token });
};

const usercreate = async (req, res) => {
  const { name, email, password, school_id, role_id, class_id } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);
  const data = await Users.create({
    name,
    password: hashPassword,
    email,
    school_id,
    role_id,
    class_id,
  });
  res.status(200).json({ data: data });
};
//   update Users
var UpdateUser = async (req, res) => {
  var updatedata = req.body;
  const data = await Users.update(updatedata, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

//delete user
var deleteUser = async (req, res) => {
  const data = await Users.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

const LogoutUser = async (req, res) => {
  function isTokenExpired(token) {
    try {
      const decodedToken = jwt.decode("my-new-secrete-key-riaz-khan", {
        complete: true,
      });
      const exp = decodedToken.payload.exp;
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      return currentTime > exp;
    } catch (error) {
      return true;
    }
  }

  // Example usage
  const jwtToken = "my-new-secrete-key-riaz-khan";

  if (isTokenExpired(jwtToken)) {
    res.send("Token has expired.");
  } else {
    res.send("Token is still valid.");
  }
};

module.exports = {
  getAllUsers,
  usercreate,
  Loginuser,
  LogoutUser,
  UpdateUser,
  deleteUser,
};
