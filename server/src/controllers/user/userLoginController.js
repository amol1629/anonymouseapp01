// controllers/userLoginController.js
const User = require("../../models/user/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    console.log("Login Request:", req.body); // Log the request body

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found:", req.body.email);
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      console.log("Password mismatch for user:", req.body.email);
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      designation: user.designation,
      createdAt: user.createdAt,
      userProfileImage: user.userProfileImage
        ? user.userProfileImage.toString("base64") // Convert image buffer to base64 string
        : null, // If no image is available
    };

    res.status(200).send({
      message: "Login Successfully", // Success message
      token: token, // JWT token
      userDetails: userDetails, // Include the user details with image
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { loginUser };
