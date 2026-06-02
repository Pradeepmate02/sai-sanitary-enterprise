// server/routes/settings.js
const express = require("express");
const router = express.Router();

//  FIXED: Importing from your two separate model files
const Category = require("../models/Category");
const Brand = require("../models/Brand");

//  CATEGORY ROUTING ENDPOINTS
router.get("/categories", async (req, res) => {
  try {
    const values = await Category.find().sort({ name: 1 });
    res.status(200).json(values.map(v => v.name)); // Sends back a clean array of strings to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/categories", async (req, res) => {
  try {
    await Category.create({ name: req.body.name });
    res.status(201).json({ message: "Category index node linked successfully" });
  } catch (error) {
    res.status(400).json({ message: "Duplicate value validation error rejected" });
  }
});

//  BRAND ROUTING ENDPOINTS
router.get("/brands", async (req, res) => {
  try {
    const values = await Brand.find().sort({ name: 1 });
    res.status(200).json(values.map(v => v.name)); // Sends back a clean array of strings to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/brands", async (req, res) => {
  try {
    await Brand.create({ name: req.body.name });
    res.status(201).json({ message: "Manufacturer profile mapping cached successfully" });
  } catch (error) {
    res.status(400).json({ message: "Duplicate profile validation error rejected" });
  }
});

module.exports = router;