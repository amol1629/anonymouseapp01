// controllers/userRegisterController.js
const Admin = require("../../models/admin/Admin");

const registerAdmin = async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      // Return an error if an admin already exists
      return res.status(403).send("You can create only one admin"); // 403 Forbidden
    }

    // If no admin exists, create a new admin
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).send(`Admin created successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerAdmin };

module.exports = { registerAdmin };
