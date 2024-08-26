const User = require("../../models/user/User");

const deleteUsersByIds = async (req, res) => {
  const userIds = req.body.userIds; // Get user IDs from request body

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).send({ message: "No user IDs provided" });
  }

  try {
    const deleteResults = await Promise.all(
      userIds.map(async (userId) => {
        const user = await User.findById(userId);

        if (!user) {
          return { userId, status: "User not found" };
        }

        await user.remove();
        return { userId, status: "Deleted" };
      })
    );

    res.status(200).send(deleteResults);
  } catch (error) {
    console.error("Error in deleting users:", error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { deleteUsersByIds };
