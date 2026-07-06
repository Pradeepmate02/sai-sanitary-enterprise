// server/seedDatabase.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Used to make authentic test user hashes matching your auth controllers

// Import all schemas exactly as defined
const Brand = require("./models/Brand");
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const InventoryHistory = require("./models/InventoryHistory");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("💾 Connected to MongoDB for Core Infrastructure Seeding...");

    // Clear existing database collections to prevent duplicate index violation drops
    await Order.deleteMany({});
    await InventoryHistory.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await User.deleteMany({});

    console.log("🧹 Previous tracking collections cleared cleanly.");

    // ------------------------------------------------------------------------
    // 1. SEED USERS (Admin, Staff, and Regular Test Customers)
    // ------------------------------------------------------------------------
    const adminPassword = await hashPassword("admin123");
    const customerPassword = await hashPassword("user123");

    const users = await User.insertMany([
      {
        name: "Pradeep Mate",
        email: "pradeep@enterprise.com",
        password: adminPassword,
        role: "admin"
      },
      {
        name: "Rohan Sharma",
        email: "rohan@staff.com",
        password: adminPassword,
        role: "staff"
      },
      {
        name: "Amit Patel",
        email: "amit.customer@gmail.com",
        password: customerPassword,
        role: "user"
      },
      {
        name: "Sneha Reddy",
        email: "sneha.test@yahoo.com",
        password: customerPassword,
        role: "user"
      }
    ]);
    console.log("👥 User profiles compiled successfully.");

    // ------------------------------------------------------------------------
    // 2. SEED BRANDS
    // ------------------------------------------------------------------------
    const brands = await Brand.insertMany([
      { name: "Jaquar" },
      { name: "Astral" },
      { name: "Sintex" },
      { name: "Supreme" },
      { name: "Cera" },
      { name: "Ashirvad" }
    ]);
    console.log("🏭 Brand entities mapped.");

    // ------------------------------------------------------------------------
    // 3. SEED CATEGORIES
    // ------------------------------------------------------------------------
    const categories = await Category.insertMany([
      { name: "Shower" },
      { name: "Tap" },
      { name: "Pipe" },
      { name: "Tank" },
      { name: "Sink" },
      { name: "Motor" },
      { name: "Fittings" }
    ]);
    console.log("🗂️ Product categorization categories structured.");

    // Helper utilities to filter arrays smoothly
    const getBrandId = (name) => brands.find((b) => b.name === name)._id;
    const getCategoryId = (name) => categories.find((c) => c.name === name)._id;

    // ------------------------------------------------------------------------
    // 4. SEED PRODUCTS (With varying stock levels to test critical shortages alert bars)
    // ------------------------------------------------------------------------
    const products = await Product.insertMany([
      {
        skuId: "PROD-001",
        name: "Premium Shower",
        description: "Multi-flow high-pressure wall shower with anti-clogging nozzles.",
        brand: getBrandId("Jaquar"),
        category: getCategoryId("Shower"),
        price: 4999,
        stock: 25,
        minStockThreshold: 10,
        images: []
      },
      {
        skuId: "PROD-002",
        name: "Luxury Sink",
        description: "Premium countertop ceramic sink with scratch-resistant premium glazing.",
        brand: getBrandId("Cera"),
        category: getCategoryId("Sink"),
        price: 3999,
        stock: 4, // ⚠️ Low stock warning trigger point test
        minStockThreshold: 8,
        images: []
      },
      {
        skuId: "PROD-003",
        name: "Modern Tap",
        description: "Quarter-turn chrome finish brass body hot & cold mixer tap.",
        brand: getBrandId("Jaquar"),
        category: getCategoryId("Tap"),
        price: 1999,
        stock: 45,
        minStockThreshold: 15,
        images: []
      },
      {
        skuId: "PROD-004",
        name: "PVC Pipe",
        description: "Heavy duty 4-inch structural water management pipeline segment.",
        brand: getBrandId("Astral"),
        category: getCategoryId("Pipe"),
        price: 999,
        stock: 120,
        minStockThreshold: 30,
        images: []
      },
      {
        skuId: "PROD-005",
        name: "Water Motor",
        description: "1 HP energy-efficient centrifugal water booster pump motor.",
        brand: getBrandId("Ashirvad"),
        category: getCategoryId("Motor"),
        price: 5999,
        stock: 18,
        minStockThreshold: 5,
        images: []
      },
      {
        skuId: "PROD-006",
        name: "Sintex Tank",
        description: "1000 Litre triple-layered antimicrobial treated overhead plastic tank.",
        brand: getBrandId("Sintex"),
        category: getCategoryId("Tank"),
        price: 6999,
        stock: 2, // ⚠️ Low stock warning trigger point test
        minStockThreshold: 5,
        images: []
      },
      {
        skuId: "PROD-007",
        name: "Elbow Joint Fittings",
        description: "90-Degree high structural tolerance leakproof pipe adapter fitting block.",
        brand: getBrandId("Supreme"),
        category: getCategoryId("Fittings"),
        price: 149,
        stock: 350,
        minStockThreshold: 50,
        images: []
      }
    ]);
    console.log("📦 Inventory products generated into cluster matrix.");

    // ------------------------------------------------------------------------
    // 5. SEED ORDERS (Testing COD, UPI, Admin Pages, and Shiprocket Tracking Fields)
    // ------------------------------------------------------------------------
    await Order.insertMany([
      {
        user: users[2]._id, // Amit Patel
        items: [
          {
            product: products[0]._id,
            name: products[0].name,
            quantity: 2,
            priceAtPurchase: 4999
          },
          {
            product: products[2]._id,
            name: products[2].name,
            quantity: 1,
            priceAtPurchase: 1999
          }
        ],
        totalAmount: 11997,
        paymentMethod: "UPI",
        paymentStatus: "Paid",
        status: "Delivered",
        shiprocketOrderId: "SR-8839210",
        shiprocketShipmentId: "SS-7711209",
        shiprocketAWB: "AWB-992100231",
        shippingAddress: {
          fullName: "Amit Patel",
          phone: "+91 9876543210",
          addressLine: "Flat 402, Green Meadows, Akurdi",
          city: "Pune",
          state: "Maharashtra",
          postalCode: "411044"
        }
      },
      {
        user: users[3]._id, // Sneha Reddy
        items: [
          {
            product: products[4]._id,
            name: products[4].name,
            quantity: 1,
            priceAtPurchase: 5999
          }
        ],
        totalAmount: 5999,
        paymentMethod: "COD",
        paymentStatus: "Pending",
        status: "Pending", // Will show up under actionable alerts in Admin overview tab
        shiprocketOrderId: "SR-8839442",
        shiprocketShipmentId: "SS-7711581",
        shiprocketAWB: "",
        shippingAddress: {
          fullName: "Sneha Reddy",
          phone: "+91 8123456789",
          addressLine: "Sector 3, HSR Layout, Block B",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560102"
        }
      }
    ]);
    console.log("🧾 Completed and Pending orders instantiated.");

    // ------------------------------------------------------------------------
    // 6. SEED INVENTORY HISTORY LOGS (Populating your Admin dashboard audit trails)
    // ------------------------------------------------------------------------
    await InventoryHistory.insertMany([
      {
        product: products[0]._id,
        skuId: products[0].skuId,
        productName: products[0].name,
        changeType: "Replenishment",
        quantityChanged: 50,
        resultingStock: 25,
        performedBy: users[0]._id // Performed by Admin
      },
      {
        product: products[1]._id,
        skuId: products[1].skuId,
        productName: products[1].name,
        changeType: "Order Deduction",
        quantityChanged: -2,
        resultingStock: 4,
        performedBy: users[1]._id // Automated Staff order action
      },
      {
        product: products[5]._id,
        skuId: products[5].skuId,
        productName: products[5].name,
        changeType: "Manual Adjustment",
        quantityChanged: -1,
        resultingStock: 2,
        performedBy: users[0]._id
      }
    ]);
    console.log("🪵 Structural tracking history footnotes cached safely.");

    console.log("\n🚀 DATABASE MOCK DATA SEEDED SUCCESSFULLY! Go ahead and test your application flow nodes.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding Operation Pipeline Aborted: ", err);
  });