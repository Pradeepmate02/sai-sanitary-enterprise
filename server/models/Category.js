const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

module.exports = mongoose.model("Category", categorySchema);