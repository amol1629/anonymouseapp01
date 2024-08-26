// routes/login.js
const express = require("express");
const {
  searchUserByName,
} = require("../../controllers/user/searchUserController");
const router = express.Router();

router.get("/:name", searchUserByName);

module.exports = router;
