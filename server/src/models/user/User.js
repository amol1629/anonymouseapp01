const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userProfileImage: {
    type: Buffer,
    required: [false, "User profile image is required"],
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
