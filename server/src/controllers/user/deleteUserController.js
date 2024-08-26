// controllers/deleteUserController.js
const User = require("../../models/user/User");

const deleteUserById = async (req, res) => {
  const userId = req.params.id; // Get user ID from URL parameters

  console.log("id : ", req.params.id);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.remove(); // Delete the user

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleting user:", error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { deleteUserById };
