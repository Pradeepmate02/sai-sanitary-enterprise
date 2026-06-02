// src/admin/pages/DashboardLanding.jsx
import React, { useState, useEffect } from "react";
import OverviewTab from "../components/OverviewTab";
import InventoryTab from "../components/InventoryTab";
import OrdersTab from "../components/OrdersTab";
import SettingsTab from "../components/SettingsTab";
import "./DashboardShell.css";

export default function DashboardLanding() {
  const [activeTab, setActiveTab] = useState("overview");

  //  LIVE STATE HOOKS (Initialized empty, waiting for MongoDB data)
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api";

  // 📥 ASYNCHRONOUS DATA PIPELINE ENGINE
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Execute parallel network fetches to your Express endpoints
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products`),
        fetch(`${API_BASE_URL}/settings/categories`),
        fetch(`${API_BASE_URL}/settings/brands`)
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();

      // Hydrate frontend states with real MongoDB documentation sets
      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error("API Connection Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Run the data load loop exactly once when the component enters the DOM mount sequence
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc", color: "#064e3b", fontWeight: "600" }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: "10px", fontSize: "20px" }}></i> 
        Synchronizing Database Nodes...
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="admin-sidebar">
        <div className="admin-profile-header">
          <div className="admin-avatar-circle">
            <span className="admin-avatar-initials">PM</span>
          </div>
          <h6 className="admin-display-name">Pradeep Mate</h6>
          <p className="admin-display-role">Admin Portal</p>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab("overview")} className={`nav-item-btn ${activeTab === "overview" ? "active" : ""}`}>
            <i className="fa-solid fa-chart-pie"></i> Overview
          </button>
          <button onClick={() => setActiveTab("inventory")} className={`nav-item-btn ${activeTab === "inventory" ? "active" : ""}`}>
            <i className="fa-solid fa-boxes-stacked"></i> Inventory
          </button>
          <button onClick={() => setActiveTab("orders")} className={`nav-item-btn ${activeTab === "orders" ? "active" : ""}`}>
            <i className="fa-solid fa-receipt"></i> Orders Log
          </button>
          <button onClick={() => setActiveTab("settings")} className={`nav-item-btn ${activeTab === "settings" ? "active" : ""}`}>
            <i className="fa-solid fa-sliders"></i> Setup Settings
          </button>
        </nav>

        <button className="admin-logout-btn">
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
        </button>
      </aside>

      {/* PORTAL MAIN CONTENT CANVAS AREA */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h1>System Control Terminal</h1>
            <p>Active Node Network Operations Tracking</p>
          </div>
          <span className="profile-badge">Live Server Status</span>
        </header>

        {/* Dynamic Context Tabs Routing Distribution */}
        {activeTab === "overview" && <OverviewTab products={products} />}
        
        {activeTab === "inventory" && (
          <InventoryTab 
            products={products} 
            refreshProducts={fetchDashboardData} // Passed down to trigger automatic UI syncs on mutation
            brands={brands} 
            categories={categories} 
          />
        )}
        
        {activeTab === "orders" && <OrdersTab />}
        
        {activeTab === "settings" && (
          <SettingsTab 
            categories={categories} 
            brands={brands} 
            refreshSettings={fetchDashboardData} 
          />
        )}
      </main>
    </div>
  );
}