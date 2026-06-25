// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is mandatory"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email address is mandatory"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password string secure hash is mandatory"]
    },
    role: {
      type: String,
      enum: ["admin", "staff", "user"],
      default: "user" // Automatically defaults to admin clearance for your setup portal
    }
  },
  { 
    timestamps: true // Automatically injects and updates createdAt and updatedAt tracks
  }
);

module.exports = mongoose.model("User", userSchema);