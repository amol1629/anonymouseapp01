// controllers/userLoginController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin/Admin");

const loginAdmin = async (req, res) => {
  try {
    console.log("Login Request:", req.body); // Log the request body

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      console.log("User not found:", req.body.email);
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      admin.password
    );
    if (!isPasswordMatch) {
      console.log("Password mismatch for admin:", req.body.email);
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: admin._id }, "secretKey", {
      expiresIn: "1h",
    });

    const adminDetails = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      designation: admin.designation,
      createdAt: admin.createdAt,
    };

    res.status(200).send({
      message: "Login Successfully", // Success message
      token: token, // JWT token
      adminDetails: adminDetails, // Include the username
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { loginAdmin };
