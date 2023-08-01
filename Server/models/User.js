const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4(),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  //removed address
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

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
