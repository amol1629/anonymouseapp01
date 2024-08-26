// routes/userRoutes.js (or similar file where you define your routes)
const express = require("express");
const router = express.Router();

// Import the controller
const {
  deleteUsersByIds,
} = require("../../controllers/user/deleteMultipleUserController");

// Define the route for deleting a user
router.delete("/", deleteUsersByIds);

module.exports = router;
