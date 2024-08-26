// routes/login.js
const express = require("express");
const { loginUser } = require("../../controllers/user/userLoginController");
const router = express.Router();

router.post("/", loginUser);



module.exports = router;
