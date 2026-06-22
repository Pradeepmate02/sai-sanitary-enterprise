// server/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    skuId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided for this catalog item."
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand", // Links to the Brand collection
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Links to the Category collection
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    minStockThreshold: {
      type: Number,
      default: 15
    },
    
    images: {
      type: [String],
      default: [] 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);