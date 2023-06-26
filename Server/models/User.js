const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  //faculty / user id
  userId: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //removed username
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  age: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    fullAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  contact: {
    type: Number,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  universityId: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
