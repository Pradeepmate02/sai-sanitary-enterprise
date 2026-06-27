// server/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const { protect, adminOnly } = require("../middleware/authMiddleware");

//  1. CLIENT CATALOG QUERY (Supports Search Filters by Name, Category, or Brand)
router.get("/", async (req, res) => {
  try {
    const { search, category, brand } = req.query;
    let queryMatrix = {};

    // Allow search by name (Case-insensitive partial keyword matching)
    if (search) {
      queryMatrix.name = { $regex: search, $options: "i" };
    }

    // Resolve category name to matching ID filter
    if (category) {
      const foundCategory = await Category.findOne({ name: category });
      if (foundCategory) queryMatrix.category = foundCategory._id;
    }

    // Resolve brand name to matching ID filter
    if (brand) {
      const foundBrand = await Brand.findOne({ name: brand });
      if (foundBrand) queryMatrix.brand = foundBrand._id;
    }

    // Pull catalog records and populate ObjectIds with actual name text strings
    const catalog = await Product.find(queryMatrix)
      .populate("category", "name")
      .populate("brand", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ message: "Failed to pull catalog records", error: error.message });
  }
});


// GET SINGLE PRODUCT BY NAME
router.get("/:name", async (req, res) => {
  try {
    const product = await Product.findOne({
      name: decodeURIComponent(req.params.name),
    })
      .populate("category", "name")
      .populate("brand", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ➕ 2. ADMIN CREATION: SPAWN NEW PRODUCT (Protected: Admins Only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, description, brandName, categoryName, price, stock, minStockThreshold, images } = req.body;

    // Resolve name dropdown selections to database IDs
    const targetCategory = await Category.findOne({ name: categoryName });
    const targetBrand = await Brand.findOne({ name: brandName });

    if (!targetCategory || !targetBrand) {
      return res.status(400).json({ message: "Specified Category or Brand does not exist inside active parameters" });
    }

    // Compute automatic incremental SKU sequence tags
    const count = await Product.countDocuments();
    const skuId = `PROD-00${count + 1}`;

    const newAsset = await Product.create({
      skuId,
      name,
      description,
      brand: targetBrand._id,
      category: targetCategory._id,
      price: parseFloat(price),
      stock: parseInt(stock),
      minStockThreshold: minStockThreshold ? parseInt(minStockThreshold) : 15,
      images: images || []
    });

    res.status(201).json({ message: "Product saved to database node", asset: newAsset });
  } catch (error) {
    res.status(400).json({ message: "Data validation error rejected", error: error.message });
  }
});

// ✏️ 3. ADMIN ACTION: EDIT EXISTING PRODUCT (Protected: Admins Only)
router.put("/:skuId", protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, stock, minStockThreshold, brandName, categoryName, images } = req.body;

    // Build the master data update object
    let updateData = { 
      name, 
      description, 
      price: parseFloat(price), 
      stock: parseInt(stock),
      minStockThreshold: parseInt(minStockThreshold),
      images: images || []
    };

    // Resolve category mutations if modified in the editing form
    if (categoryName) {
      const foundCategory = await Category.findOne({ name: categoryName });
      if (foundCategory) updateData.category = foundCategory._id;
    }

    // Resolve brand mutations if modified in the editing form
    if (brandName) {
      const foundBrand = await Brand.findOne({ name: brandName });
      if (foundBrand) updateData.brand = foundBrand._id;
    }

    const modifiedAsset = await Product.findOneAndUpdate(
      { skuId: req.params.skuId },
      updateData,
      { new: true, runValidators: true }
    ).populate("category", "name").populate("brand", "name");

    if (!modifiedAsset) {
      return res.status(404).json({ message: "Target product tracking reference matching key not found" });
    }

    res.status(200).json({ message: "Inventory parameters updated successfully", asset: modifiedAsset });
  } catch (error) {
    res.status(400).json({ message: "Modification update loop rejected", error: error.message });
  }
});

//  4. ADMIN ACTION: PURGE PRODUCT FROM COLLECTION (Protected: Admins Only)
router.delete("/:skuId", protect, adminOnly, async (req, res) => {
  try {
    const targetAsset = await Product.findOneAndDelete({ skuId: req.params.skuId });
    if (!targetAsset) {
      return res.status(404).json({ message: "Target product record not found" });
    }
    res.status(200).json({ message: "Product completely purged from active records cluster" });
  } catch (error) {
    res.status(500).json({ message: "Purge execution failed", error: error.message });
  }
});

module.exports = router;