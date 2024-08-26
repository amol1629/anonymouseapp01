// routes/userRoutes.js (or similar file where you define your routes)
const express = require("express");
const router = express.Router();

// Import the controller
const { deleteUserById } = require("../../controllers/user/deleteUserController");


// Define the route for deleting a user
router.delete("/:id", deleteUserById);

module.exports = router;
