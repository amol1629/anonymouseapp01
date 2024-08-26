// routes/login.js
const express = require("express");
const { loginAdmin } = require("../../controllers/admin/adminLoginController");
const router = express.Router();

router.post("/", loginAdmin);

module.exports = router;
