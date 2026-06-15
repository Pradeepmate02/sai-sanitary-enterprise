// server/models/InventoryHistory.js
const mongoose = require("mongoose");

const inventoryHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    skuId: { type: String, required: true },
    productName: { type: String, required: true },
    changeType: {
      type: String,
      enum: ["Replenishment", "Order Deduction", "Manual Adjustment"],
      required: true
    },
    quantityChanged: {
      type: Number, // Example: +50 for restocking, -2 for checkouts
      required: true
    },
    resultingStock: {
      type: Number, // Final storage calculation state after operations execute
      required: true
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryHistory", inventoryHistorySchema);