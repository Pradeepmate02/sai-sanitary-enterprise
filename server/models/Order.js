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
      required: [true, "Product name is mandatory"],
      trim: true,
    },
    description: {
      type: String,
      default: "No description provided for this architectural component asset.",
      trim: true
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand", 
      required: [true, "Supplier brand association identifier is mandatory"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: [true, "Sorting category association identifier is mandatory"],
    },
    price: {
      type: Number,
      required: [true, "Product unit valuation price is mandatory"],
      min: [0, "Valuation scales cannot fall below zero parameter metrics"],
    },
    stock: {
      type: Number,
      required: [true, "Available storage stock count is mandatory"],
      min: [0, "Storage stock units cannot register negative volumes"],
      default: 0,
    },
    minStockThreshold: {
      type: Number,
      default: 15, // Automated trigger points for low stock alerts
      min: 0
    },
    images: [
      {
        type: String, // String URLs path pointing to cloud store assets or assets folders
        default: []
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);