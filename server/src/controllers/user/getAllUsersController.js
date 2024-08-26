// controllers/getAllUsersController.js
const User = require("../../models/user/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Retrieve all users from the database

    // You might want to transform the data here, for example, removing sensitive information
    const usersData = users.map((user) => {
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        designation: user.designation,
        createdAt: user.createdAt,
        userProfileImage: user.userProfileImage,
        // Add other fields as necessary
      };
    });

    res.status(200).send(usersData); // Send the transformed data
  } catch (error) {
    console.error("Error in getting users:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { getAllUsers };
