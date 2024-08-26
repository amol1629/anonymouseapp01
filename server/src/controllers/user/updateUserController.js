// controllers/updateUserController.js
const User = require("../../models/user/User");

const updateUserById = async (req, res) => {
  const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
  const updateData = req.body; // The updated user data

  try {
    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // You might want to transform the data here as well, if needed
    const updatedUserData = {
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      designation: updatedUser.designation,
      createdAt: updatedUser.createdAt,
      // Add other fields as necessary
    };

    // Send the updated user data along with a success message
    res
      .status(200)
      .send({ message: "User updated successfully", data: updatedUserData });
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { updateUserById };
