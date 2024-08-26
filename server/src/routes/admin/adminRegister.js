// routes/register.js
const express = require("express");
const {
  registerAdmin,
} = require("../../controllers/admin/adminRegistrationController");
const router = express.Router();

router.post("/", registerAdmin);

module.exports = router;
