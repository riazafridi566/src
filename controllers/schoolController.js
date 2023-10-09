const School = require("../database/models/School");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../database/models/UserModel");

const getSchoolinfo = async (req, res) => {
  try {
    const data = await School.findAll({
      include: [{ model: Users, attributes: ["name", "email"] }],
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
//get all Schools Teachers
const getAllSchoolsTeachers = async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await School.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
          where: { role_id: 3 },
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
      message: error.message,
    });
  }
};
//get all Schools Students
const getAllSchoolsStudents = async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await School.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
          where: { role_id: 4 },
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
      message: error.message,
    });
  }
};

const schoolcreate = async (req, res) => {
  const { school_name, email, contact, address, name, password, user_email } =
    req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await School.create({
    school_name,
    email,
    contact,
    address,
  });

  const user = await Users.create({
    name,
    password: hashedPassword, // Store the hashed password in the database
    email: user_email,
    role_id: 2,
  });

  res.status(200).json({ message: "school created" });
};
const updateSchool = async (req, res) => {
  const { school_name, contact, address, email, name, user_email, password } =
    req.body;

  try {
    // Checking if the school and user exist
    const school = await School.findByPk(req.params.id);
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user data found with id " + req.params.id,
      });
    }

    if (!school) {
      return res.status(400).json({
        status: "fail",
        message: "No school data found with id " + req.params.id,
      });
    }

    // Update school data
    const schoolUpdateData = await School.update(
      {
        email: email,
        ...req.body,
      },
      { where: { id: req.params.id } }
    );

    // Update user data
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await Users.update(
        {
          ...req.body,
          password: hashedPassword,
          updated_by: req?.user?.id,
          updated_at: new Date(),
        },
        { where: { id: req.params.id } }
      );
    } else {
      await Users.update(
        {
          name,
          contact,
          email: user_email,
        },
        { where: { id: req.params.id } }
      );
    }

    res.status(200).json({ message: "School updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteSchool = async (req, res) => {
  const { id } = req.params;
  try {
    const findSchool = await School.findByPk(id);
    if (!findSchool)
      return res.status(400).json({
        status: "fail",
        message: "no data found with id " + req.params.id,
      });

    const data = await School.destroy({ where: { id: id } });

    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  getSchoolinfo,
  schoolcreate,
  getAllSchoolsTeachers,
  getAllSchoolsStudents,
  deleteSchool,
  updateSchool,
};
