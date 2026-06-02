// server/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//  FETCH COMPLETE INVENTORY CATALOG LIST
router.get("/", async (req, res) => {
  try {
    const catalog = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ message: "Failed to pull inventory assets tracking", error: error.message });
  }
});

//  SPAWN NEW PRODUCT ENTRY RECORD
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, price, stock } = req.body;

    // Compile an incremental sequential placeholder tracking string 
    const sequenceCount = await Product.countDocuments();
    const skuId = `PROD-00${sequenceCount + 1}`;

    const newAsset = await Product.create({
      skuId,
      name,
      brand,
      category,
      price: parseFloat(price),
      stock: parseInt(stock)
    });

    res.status(201).json({ message: "Asset cached into master inventory node", asset: newAsset });
  } catch (error) {
    res.status(400).json({ message: "Data format validation matrix mismatch", error: error.message });
  }
});

//  3. DESTRUCTIVE DELETION REMOVAL LOG
router.delete("/:id", async (req, res) => {
  try {
    const targetAsset = await Product.findOneAndDelete({ skuId: req.params.id });
    
    if (!targetAsset) {
      return res.status(404).json({ message: "Target product asset parameter matching key not found" });
    }
    
    res.status(200).json({ message: "Product sequence purged out of collection logs successfully" });
  } catch (error) {
    res.status(500).json({ message: "Purge process interrupted by compilation runtime failure", error: error.message });
  }
});

module.exports = router;