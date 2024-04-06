const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    requied: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 18,
    validate(val) {
      if (val <= 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  city: {
    type: String,
  },
});

module.exports = User;
