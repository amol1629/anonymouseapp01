const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }, // Add createdAt field
});

AdminSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("Admin", AdminSchema);
