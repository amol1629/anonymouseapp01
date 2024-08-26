const express = require("express");

const mongoose = require("mongoose");

const SALT_I = 10;

// For password hashing :
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  customerFirstName: {
    type: String,
    require: true,
    trim: true,
  },

  customerLastName: {
    type: String,
    require: true,
    trim: true,
  },

  customerEmail: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },

  customerPassword: {
    type: String,
    require: true,
    trim: true,
  },
});

// Password hashing :

// customerSchema.pre("save", async function (next) {
//   if (this.isModified("customerPassword")) {
//     this.customerPassword = await bcrypt.hash(this.customerPassword, 12);
//   }
//   next();
// });

customerSchema.pre("save", function (next) {
  let insertNewCustomerSchema = this;

  if (insertNewCustomerSchema.isModified("customerPassword")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(
        insertNewCustomerSchema.customerPassword,
        salt,
        function (err, hash) {
          if (err) return next(err);

          insertNewCustomerSchema.customerPassword = hash;

          console.log("hash password = ", hash);

          next();
        }
      );
    });
  } else {
    next();
  }
});

const CustomerSchema = new mongoose.model("Customer", customerSchema);

module.exports = CustomerSchema;
