// server/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword, comparePassword, generateToken } = require("../utils/authHelpers");

//  1. USER SIGNUP / REGISTRATION ENDPOINT
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Boundary Check: Verify if email entry already occupies space in the cluster
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Registration failed. Account already exists." });
    }

    // Invoke Utility: Intercept raw password and hash it before database interaction
    const securePassword = await hashPassword(password);

    // Write Record: Instantiate fresh document parameters onto your cluster
    const newUser = await User.create({
      name,
      email,
      password: securePassword,
      role
    });

    // Response pipeline emission
    res.status(201).json({
      message: "Account provisioned successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal compilation failure during registration", error: error.message });
  }
});

//  2. USER LOGIN / AUDIT AUTHORIZATION ENDPOINT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Pull Account Profile from MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or credentials matching sequences" });
    }

    // Invoke Utility: Evaluate plain input string against stored hash matrix
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or credentials matching sequences" });
    }

    // Invoke Utility: Compile access token payload bound with database parameters
    const token = generateToken(user._id);

    // Dispatch profile package back to client memory
    res.status(200).json({
      message: "Authentication authorized successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal compilation failure during login", error: error.message });
  }
});

module.exports = router;