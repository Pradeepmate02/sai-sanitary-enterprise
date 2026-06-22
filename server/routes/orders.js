// server/routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const InventoryHistory = require("../models/InventoryHistory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

//  1. CUSTOMER: PLACE NEW ORDER ONLINE (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart checkout failed: Shopping cart is empty" });
    }

    let calculatedTotal = 0;
    const verifiedItems = [];

    // Verify values against current database records to prevent pricing fraud
    for (const item of items) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res.status(404).json({ message: `Product reference link ${item.product} no longer exists` });
      }

      const itemTotal = dbProduct.price * item.quantity;
      calculatedTotal += itemTotal;

      verifiedItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        quantity: item.quantity,
        priceAtPurchase: dbProduct.price
      });
    }

    // Provision new order entry tracking record
    const newOrder = await Order.create({
      user: req.user._id, // Tied securely from decrypted JWT payload tokens
      items: verifiedItems,
      totalAmount: calculatedTotal,
      shippingAddress
    });

    console.log(` NOTIFICATION ALERT: A new order [ ${newOrder._id} ] has been placed by customer account.`);
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Order checkout pipeline crashed", error: error.message });
  }
});

//  2. ADMIN: VIEW ALL INBOUND CUSTOMER ORDERS (Protected: Admins Only)
router.get("/admin/all", protect, adminOnly, async (req, res) => {
  try {
    const registry = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(registry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  3. CUSTOMER: VIEW OWN ACCOUNTS ORDER STATUS TRACES (Protected)
router.get("/my-orders", protect, async (req, res) => {
  try {
    const history = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ADMIN: ACCEPT / DECLINE ORDERS WITH AUTOMATIC STOCK DEDUCTIONS
router.patch("/:orderId/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body; // Expects "Accepted", "Declined", "Dispatched", "Delivered"
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Target order record tracking token missing" });
    }

    // Boundary check to block repeating stock deductions if order was already approved
    if (status === "Accepted" && order.status !== "Accepted") {
      
      // Step through items to verify stock availability before changing parameters
      for (const item of order.items) {
        const dbProduct = await Product.findById(item.product);
        if (!dbProduct || dbProduct.stock < item.quantity) {
          return res.status(400).json({ 
            message: `Cannot accept order. Asset [ ${item.name} ] has insufficient warehouse stock reserves.` 
          });
        }
      }

      // Safe to proceed: Deduct units and log structural history footprints
      for (const item of order.items) {
        const dbProduct = await Product.findById(item.product);
        
        dbProduct.stock -= item.quantity; // Decrease stock count parameter rules
        await dbProduct.save();

        // Requirement: Generate low-stock alerts when inventory falls below minimum thresholds
        if (dbProduct.stock <= dbProduct.minStockThreshold) {
          console.log(` LOW-STOCK ALERT: Material asset [ ${dbProduct.name} ] has dropped down to ${dbProduct.stock} items remaining.`);
        }

        // Requirement: Maintain inventory history tracking logs
        await InventoryHistory.create({
          product: dbProduct._id,
          skuId: dbProduct.skuId,
          productName: dbProduct.name,
          changeType: "Order Deduction",
          quantityChanged: -item.quantity,
          resultingStock: dbProduct.stock,
          performedBy: req.user._id
        });
      }
    }

    order.status = status;
    await order.save();

    console.log(` NOTIFICATION TRANSMISSION: Customer assigned to order [ ${order._id} ] has been notified of status change: ${status}`);
    res.status(200).json({ message: `Order status updated cleanly to [ ${status} ]`, order });
  } catch (error) {
    res.status(500).json({ message: "Fulfillment routing workflow state failure", error: error.message });
  }
});

module.exports = router;