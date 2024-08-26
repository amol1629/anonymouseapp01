// routes/register.js
const express = require("express");
const {
  registerUser,
} = require("../../controllers/user/userRegisterController");
const router = express.Router();

router.post("/", registerUser);

module.exports = router;
