// src/admin/components/OrdersTab.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersTab.css";

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // 📥 ASYNCHRONOUS DATA PIPELINE FETCH ENGINE
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Secure admin access cross-link tracking token
      
      const res = await axios.get(`${API_BASE_URL}/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to synchronize inbound customer orders registry:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger server sync exactly once when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", padding: "40px", alignItems: "center", justifyContent: "center", fontWeight: "600", color: "#0F766E" }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: "10px" }}></i>
        Compiling Live Transaction Matrices...
      </div>
    );
  }

  return (
    <div className="orders-tab-container">
      <section className="admin-table-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>Complete Fulfilled & Outstanding Logs</h2>
          <button className="refresh-logs-btn" onClick={fetchOrders} style={{ padding: "8px 14px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#334155" }}>
            <i className="fa-solid fa-rotate" style={{ marginRight: "6px" }}></i> Reload Registry
          </button>
        </div>

        <div className="table-wrapper">
          {orders.length === 0 ? (
            <div className="empty-logs-wrapper" style={{ padding: "40px", textAlign: "center", background: "#f8fafc", borderRadius: "8px" }}>
              <p style={{ color: "#64748b", margin: 0 }}>No administrative logistics transactions indexed in the current terminal window.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order reference</th>
                  <th>Customer Destination Details</th>
                  <th>Manifest Breakdown</th>
                  <th>Grand Payable</th>
                  <th>Routing Status</th>
                  <th>Logistics Hub Tracking</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    {/* Unique Order Identifier Code */}
                    <td>
                      <code>{order._id.toUpperCase()}</code>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </td>

                    {/* Customer Identity and Address Footprint */}
                    <td>
                      <div style={{ fontWeight: "600", color: "#0f172a" }}>{order.shippingAddress?.fullName || order.user?.name || "Anonymous Client"}</div>
                      <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px" }}>📞 {order.shippingAddress?.phone}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={`${order.shippingAddress?.addressLine}, ${order.shippingAddress?.city}`}>
                        📍 {order.shippingAddress?.addressLine}, {order.shippingAddress?.city}
                      </div>
                    </td>

                    {/* Array List breakdown items summary mapping */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ fontSize: "13px", color: "#334155" }}>
                            • {item.name} <span style={{ color: "#0F766E", fontWeight: "600" }}>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Final Aggregate Pricing Matrix */}
                    <td>
                      <strong style={{ color: "#0f172a", fontSize: "15px" }}>₹{order.totalAmount?.toLocaleString("en-IN")}</strong>
                      <div style={{ marginTop: "4px" }}>
                        <span style={{ padding: "3px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", background: order.paymentMethod === "UPI" ? "#e0f2fe" : "#fef3c7", color: order.paymentMethod === "UPI" ? "#0369a1" : "#b45309" }}>
                          {order.paymentMethod}
                        </span>
                      </div>
                    </td>

                    {/* Core Process Lifecycle Pill Status */}
                    <td>
                      <span className={`status-pill ${order.status?.toLowerCase() || "pending"}`}>
                        {order.status || "Pending"}
                      </span>
                      <div style={{ fontSize: "11px", color: order.paymentStatus === "Paid" ? "#16a34a" : "#dc2626", fontWeight: "600", marginTop: "6px", marginLeft: "4px" }}>
                        ● {order.paymentStatus}
                      </div>
                    </td>

                    {/* Shiprocket Simulation Node Pipeline Fields Tracking Layout */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px" }}>
                        <div><span style={{ color: "#64748b" }}>ID:</span> <code style={{ color: "#334155" }}>{order.shiprocketOrderId || "Unassigned"}</code></div>
                        <div><span style={{ color: "#64748b" }}>AWB:</span> <span style={{ fontFamily: "monospace", color: "#475569" }}>{order.shiprocketAWB || "Awaiting dispatch"}</span></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}