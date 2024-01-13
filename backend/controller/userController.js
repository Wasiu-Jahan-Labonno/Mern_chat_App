const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { model } = require("mongoose");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (res, req) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("PLease enter All the fields");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exits");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Failed to create the user");
  }
});

module.exports = { registerUser };
