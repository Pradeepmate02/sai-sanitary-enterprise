// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Extract environment keys
dotenv.config();

// Routing Subsystem Module Integrations
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const settingsRoutes = require("./routes/settings");
const orderRoutes = require("./routes/orders");
const reportRoutes = require("./routes/reports");

const app = express();
const port = process.env.PORT || 5000;

// Central Global Security & Encoding Transformers Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Verify Shiprocket credentials are set up in your .env file
if (!process.env.SHIPROCKET_EMAIL || !process.env.SHIPROCKET_PASSWORD) {
  console.warn("⚠️  WARNING: Shiprocket credentials missing in environment variables (.env). Checkout integrations may fail.");
}

// REGISTER CORE RESTFUL API ROUTING COMMUNICATION LANE HEADERS
app.use("/api/auth", authRoutes);       // Endpoints: /register, /login
app.use("/api/products", productRoutes); // Endpoints: GET /, POST /, PUT /:skuId, DELETE /:skuId
app.use("/api/settings", settingsRoutes); // Endpoints: /categories, /brands
app.use("/api/orders", orderRoutes);     // Endpoints: POST /, GET /admin/all, GET /my-orders, PATCH /:orderId/status
app.use("/api/reports", reportRoutes);   // Endpoints: GET /dashboard-summary, POST /replenish/:skuId

// Database Spine Bootstrapping Routine Engine
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("💾 Global Database Node Connected Successfully."))
  .catch((err) => console.error("❌ Database Connection Failure: ", err));

// Ensure uploads directory exists on server initialization
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
  console.log("📁 Created missing uploads directory root.");
}

// Live Server Thread Port Listener
app.listen(port, () => {
  console.log(`🚀 Operational Server Live on Port Terminal: http://localhost:${port}`);
});