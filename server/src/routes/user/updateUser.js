// routes/userRoutes.js (or similar file where you define your routes)
const express = require("express");
const router = express.Router();

// Import the controller
const {
  updateUserById,
} = require("../../controllers/user/updateUserController");

// Define the route for deleting a user
router.put("/:id", updateUserById);

module.exports = router;
