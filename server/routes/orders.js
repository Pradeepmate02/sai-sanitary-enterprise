// server/routes/orders.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Helper function to get Shiprocket Token
async function getShiprocketToken() {
  try {
    const response = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    });
    return response.data.token;
  } catch (error) {
    console.error("Shiprocket Auth Failed:", error.message);
    return null;
  }
}

// CUSTOMER: PLACE NEW ORDER ONLINE WITH SHIPROCKET LNK
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart checkout failed: Shopping cart is empty" });
    }

    let calculatedTotal = 0;
    const verifiedItems = [];
    const shiprocketOrderItems = [];

    for (const item of items) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res.status(404).json({ message: `Product reference link ${item.product} no longer exists` });
      }

      calculatedTotal += dbProduct.price * item.quantity;

      verifiedItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        quantity: item.quantity,
        priceAtPurchase: dbProduct.price
      });

      shiprocketOrderItems.push({
        name: dbProduct.name,
        sku: dbProduct.skuId || `SKU-${dbProduct._id}`,
        units: item.quantity,
        selling_price: dbProduct.price
      });
    }

    // Provision new order inside local MongoDB tracking
    const newOrder = await Order.create({
      user: req.user._id,
      items: verifiedItems,
      totalAmount: calculatedTotal,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "UPI" ? "Paid" : "Pending" // For UPI, handle gate confirmation flow
    });

    // Integrated Shiprocket Manifest Generation
    const token = await getShiprocketToken();
    if (token) {
      try {
        const shiprocketPayload = {
          order_id: newOrder._id.toString(),
          order_date: new Date().toISOString().split("T")[0],
          pickup_location: "Primary Warehouse", // Must match your verified Shiprocket pickup terminal profile name
          billing_customer_name: shippingAddress.fullName,
          billing_last_name: "",
          billing_address: shippingAddress.addressLine,
          billing_city: shippingAddress.city,
          billing_pincode: shippingAddress.postalCode,
          billing_state: shippingAddress.state,
          billing_country: "India",
          billing_email: req.user.email || "customer@store.com",
          billing_phone: shippingAddress.phone,
          shipping_is_billing: true,
          order_items: shiprocketOrderItems,
          payment_method: paymentMethod === "COD" ? "COD" : "Prepaid",
          sub_total: calculatedTotal,
          length: 10, // Default fallback dimensions (can be dynamic per product later)
          width: 10,
          height: 10,
          weight: 0.5
        };

        const srResponse = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
          shiprocketPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (srResponse.data && srResponse.data.order_id) {
          newOrder.shiprocketOrderId = srResponse.data.order_id;
          newOrder.shiprocketShipmentId = srResponse.data.shipment_id;
          await newOrder.save();
        }
      } catch (srErr) {
        console.error("Shiprocket Order Generation Skipped:", srErr.message);
      }
    }

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Order checkout pipeline crashed", error: error.message });
  }
});

// ADMIN: VIEW ALL INBOUND CUSTOMER ORDERS
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

module.exports = router;