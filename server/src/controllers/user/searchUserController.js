const User = require("../../models/user/User");

const searchUserByName = async (req, res) => {
  try {
    const searchQuery = req.params.name.split(" "); // Splitting the input on spaces
    let query = [];

    searchQuery.forEach((name) => {
      if (name) {
        query.push({ firstName: { $regex: name, $options: "i" } });
        query.push({ lastName: { $regex: name, $options: "i" } });
      }
    });

    const users = await User.find({
      $or: query,
    });

    // Check if users array is empty
    if (users.length === 0) {
      return res.status(404).send({ message: "Searched User is not found" });
    }

    res.json({ message: "Searched User Details", users: users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { searchUserByName };
