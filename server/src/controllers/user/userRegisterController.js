// controllers/userRegisterController.js
const User = require("../../models/user/User");
const nodemailer = require("nodemailer");

require("dotenv").config(); // Make sure this line is at the top of your file

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: parseInt(process.env.SMTPPORT, 10), // Ensure this is a number
  secure: false, // For port 587, this should be false as it starts with a non-secure connection and then upgrades
  auth: {
    user: process.env.SMTPUSERNAME,
    pass: process.env.SMTPPASSWORD,
  },
});

const registerUser = async (req, res) => {
  try {
    // Check if a user with the provided username already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .send(`User with email "${req.body.email}" already exists`); // 409 Conflict
    }

    // If the user does not exist, create a new user
    const newUser = new User(req.body);

    // Send the confirmation email
    // const confirmationEmailOptions = {
    //   from: "harvard.4.0.40@gmail.com",
    //   to: newUser.email, // Assuming email is part of the user's registration data
    //   subject: "Your Registration is Successful",
    //   html: `
    //     <div style="font-size: 16px;">
    //         <p>Hi ${newUser.firstName} ${newUser.lastName},</p>
    //         <p>Your registration as "${newUser.designation}" with Products Team Documentation is successful. Welcome to our community!</p>
    //         <p>Cheers,<br>Team Products, <br>King Maker</p>
    //     </div>
    //   `,
    // };

    try {
      // Uncomment this later after email services up.
      // await transporter.sendMail(confirmationEmailOptions);
      console.log("Email sent...Registration and email confirmation done");
      const userData = await newUser.save();
      res.status(201).send({ message: "User created successfully", userData });
      // .send(`User with email "${req.body.email}" created successfully`);
    } catch (emailError) {
      console.error("Failed to send confirmation email", emailError);
      res.status(500).send(emailError);
      // Decide how you want to handle the situation where user registration succeeds but email fails
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser };
