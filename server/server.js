// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routing Module Strategy Definitions
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/products.js");
const settingsRoutes = require("./routes/settings.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

// Central Security & Object Transformers Middleware
app.use(cors());
app.use(express.json());

// 🟢 MOUNT OPERATIONAL SUBSYSTEM PATHS
app.use("/api/auth", authRoutes);       // Paths: /register, /login
app.use("/api/products", productRoutes); // Paths: GET /, POST /, DELETE /:id
app.use("/api/settings", settingsRoutes); // Paths: /categories, /brands

// Central Cluster Connection String Engine
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("💾 Global Database Node Connected Successfully."))
  .catch((err) => console.error("🚨 Database Connection Failure: ", err));

app.listen(port, () => {
  console.log(`🚀 Operational Server Live on Port Terminal: http://localhost:${port}`);
});