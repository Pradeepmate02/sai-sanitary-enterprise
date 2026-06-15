// server/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword, comparePassword, generateToken } = require("../utils/authHelpers");

// 🟢 1. USER REGISTRATION ENDPOINT
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email entry already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Registration failed. Account already exists." });
    }

    // Encrypt raw password before saving
    const securePassword = await hashPassword(password);

    // Create fresh user account documentation
    const newUser = await User.create({
      name,
      email,
      password: securePassword,
      role: role || "user" // Defaults to normal customer unless explicitly stated
    });

    res.status(201).json({
      message: "Account provisioned successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error: error.message });
  }
});

// 🔵 2. AUTOMATED ROLE-DETECTION LOGIN ENDPOINT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Pull user account by email profile matching string
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password credentials" });
    }

    // 2. Evaluate plain input string against stored password hash
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password credentials" });
    }

    // 3. Compile encrypted access token
    const token = generateToken(user._id);

    // 4. AUTOMATIC ROLE RETURN: Sends the role back to React for automatic dashboard routing
    res.status(200).json({
      message: "Authentication successful",
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role // 👈 React reads this ("admin" or "user") to redirect automatically
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login processing", error: error.message });
  }
});

module.exports = router;