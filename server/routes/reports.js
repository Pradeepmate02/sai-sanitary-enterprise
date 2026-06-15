// server/routes/reports.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const InventoryHistory = require("../models/InventoryHistory");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// 📊 ADMIN: FETCH SALES PERFORMANCE AND INVENTORY SHORTAGES REPORTS (Protected: Admins Only)
router.get("/dashboard-summary", protect, adminOnly, async (req, res) => {
  try {
    // 1. Calculate Gross Revenue from all Approved orders
    const completedOrders = await Order.find({ status: { $in: ["Accepted", "Dispatched", "Delivered"] } });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // 2. Fetch all products currently running below their defined low-stock alerts limits
    const rawProducts = await Product.find().populate("category", "name").populate("brand", "name");
    
    const lowStockAlerts = rawProducts.filter(p => p.stock <= p.minStockThreshold).map(p => ({
      skuId: p.skuId,
      name: p.name,
      currentStock: p.stock,
      thresholdLimit: p.minStockThreshold,
      category: p.category?.name,
      brand: p.brand?.name
    }));

    // 3. Fetch the 10 most recent inventory movements for structural history audits
    const auditLogs = await InventoryHistory.find()
      .populate("performedBy", "name")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      metricsSummary: {
        grossRevenueGenerated: totalRevenue,
        totalCatalogItemsCount: rawProducts.length,
        criticalShortagesCount: lowStockAlerts.length,
        totalWarehouseUnitsVolume: rawProducts.reduce((sum, p) => sum + p.stock, 0)
      },
      lowStockWarningsRegistry: lowStockAlerts,
      recentInventoryMovements: auditLogs
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate dashboard accounting statistics", error: error.message });
  }
});

// ➕ ADMIN: REPLENISH STOCK / ADJUST MANUAL QUANTITIES (Protected: Admins Only)
router.post("/replenish/:skuId", protect, adminOnly, async (req, res) => {
  try {
    const { restockQuantity } = req.body; // Expected value integer eg: 100
    const count = parseInt(restockQuantity);

    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ message: "Invalid restock calculation size increment string format match" });
    }

    const itemNode = await Product.findOne({ skuId: req.params.skuId });
    if (!itemNode) {
      return res.status(404).json({ message: "Target product record not found" });
    }

    // Apply addition mutations to database storage variables
    itemNode.stock += count;
    await itemNode.save();

    // Log tracking parameter directly into the permanent audit collection log history
    const historyLog = await InventoryHistory.create({
      product: itemNode._id,
      skuId: itemNode.skuId,
      productName: itemNode.name,
      changeType: "Replenishment",
      quantityChanged: count,
      resultingStock: itemNode.stock,
      performedBy: req.user._id
    });

    res.status(200).json({ message: `Successfully restocked ${count} units. New balance: ${itemNode.stock}`, entry: historyLog });
  } catch (error) {
    res.status(500).json({ message: "Replenishment cycle execution interrupted", error: error.message });
  }
});

module.exports = router;