require("dotenv").config();

const mongoose = require("mongoose");

const Brand = require("./models/Brand");
const Category = require("./models/Category");
const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Remove old demo data
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});

    // ---------------- Brands ----------------

    const brands = await Brand.insertMany([
      { name: "Jaquar" },
      { name: "Astral" },
      { name: "Sintex" },
      { name: "Supreme" },
      { name: "Cera" },
      { name: "Ashirvad" },
    ]);

    // ---------------- Categories ----------------

    const categories = await Category.insertMany([
      { name: "Shower" },
      { name: "Tap" },
      { name: "Pipe" },
      { name: "Tank" },
      { name: "Sink" },
      { name: "Motor" },
    ]);

    // Helper Functions

    const getBrand = (name) =>
      brands.find((b) => b.name === name)._id;

    const getCategory = (name) =>
      categories.find((c) => c.name === name)._id;

    // ---------------- Products ----------------

    await Product.insertMany([
      {
        skuId: "PROD-001",
        name: "Premium Shower",
        description: "High pressure bathroom shower",
        brand: getBrand("Jaquar"),
        category: getCategory("Shower"),
        price: 4999,
        stock: 25,
        minStockThreshold: 5,
        images: [],
      },

      {
        skuId: "PROD-002",
        name: "Luxury Sink",
        description: "Premium ceramic sink",
        brand: getBrand("Cera"),
        category: getCategory("Sink"),
        price: 3999,
        stock: 20,
        minStockThreshold: 5,
        images: [],
      },

      {
        skuId: "PROD-003",
        name: "Modern Tap",
        description: "Chrome finish tap",
        brand: getBrand("Jaquar"),
        category: getCategory("Tap"),
        price: 1999,
        stock: 35,
        minStockThreshold: 10,
        images: [],
      },

      {
        skuId: "PROD-004",
        name: "PVC Pipe",
        description: "High quality PVC pipe",
        brand: getBrand("Astral"),
        category: getCategory("Pipe"),
        price: 999,
        stock: 150,
        minStockThreshold: 20,
        images: [],
      },

      {
        skuId: "PROD-005",
        name: "Water Motor",
        description: "1 HP Water Motor",
        brand: getBrand("Ashirvad"),
        category: getCategory("Motor"),
        price: 5999,
        stock: 18,
        minStockThreshold: 5,
        images: [],
      },

      {
        skuId: "PROD-006",
        name: "Sintex Tank",
        description: "1000L Water Tank",
        brand: getBrand("Sintex"),
        category: getCategory("Tank"),
        price: 6999,
        stock: 12,
        minStockThreshold: 5,
        images: [],
      },

      {
        skuId: "PROD-007",
        name: "Wall Mixer Tap",
        description: "Bathroom wall mixer",
        brand: getBrand("Jaquar"),
        category: getCategory("Tap"),
        price: 3499,
        stock: 30,
        minStockThreshold: 10,
        images: [],
      },

      {
        skuId: "PROD-008",
        name: "CPVC Pipe",
        description: "Hot & Cold Water Pipe",
        brand: getBrand("Ashirvad"),
        category: getCategory("Pipe"),
        price: 1299,
        stock: 90,
        minStockThreshold: 20,
        images: [],
      },

      {
        skuId: "PROD-009",
        name: "Overhead Shower",
        description: "Rain shower head",
        brand: getBrand("Jaquar"),
        category: getCategory("Shower"),
        price: 4499,
        stock: 16,
        minStockThreshold: 5,
        images: [],
      },

      {
        skuId: "PROD-010",
        name: "Supreme Water Tank",
        description: "500L Water Tank",
        brand: getBrand("Supreme"),
        category: getCategory("Tank"),
        price: 5499,
        stock: 10,
        minStockThreshold: 5,
        images: [],
      },
    ]);

    console.log("Demo Database Seeded Successfully");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
  });