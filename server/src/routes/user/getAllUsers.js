// routes/login.js
const express = require("express");
const { getAllUsers } = require("../../controllers/user/getAllUsersController");
const router = express.Router();

router.get("/", getAllUsers);


module.exports = router;
