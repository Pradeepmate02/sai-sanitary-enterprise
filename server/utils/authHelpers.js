// server/utils/authHelpers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Encrypts a plain-text password using a secure auto-generated salt block.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Validates a user's login attempt by comparing the plain-text string against the database hash.
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Generates an encrypted JWT access token embedded with the user's unique Database ID identifier.
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1d" } // Token self-destructs safely after 24 hours
  );
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
};