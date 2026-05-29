// src/admin/pages/DashboardLanding.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OverviewTab from "../components/OverviewTab";
import InventoryTab from "../components/InventoryTab";
import OrdersTab from "../components/OrdersTab";
import SettingsTab from "../components/SettingsTab";
import "./DashboardShell.css";

function DashboardLanding() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Lifted global data states
  const [categories, setCategories] = useState(["Pipes", "Bathroom", "Kitchen", "Motors"]);
  const [brands, setBrands] = useState(["Astral", "Supreme", "Finolex", "Jaquar"]);
  const [products, setProducts] = useState([
    { id: "PROD-001", name: "PVC Pipe 4-inch", brand: "Astral", category: "Pipes", price: "₹999", stock: 45 },
    { id: "PROD-002", name: "Premium Shower", brand: "Jaquar", category: "Bathroom", price: "₹4,999", stock: 12 },
    { id: "PROD-003", name: "Luxury Sink", brand: "Supreme", category: "Kitchen", price: "₹2,999", stock: 0 },
    { id: "PROD-004", name: "Water Motor 1HP", brand: "Finolex", category: "Motors", price: "₹5,999", stock: 8 },
  ]);

  const adminName = "Pradeep Mate";
  const imageSrc = ""; 
  const initial = adminName.charAt(0).toUpperCase();

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-profile-header">
          <div className="admin-avatar-circle">
            {imageSrc ? <img src={imageSrc} alt="Profile" /> : <div className="admin-avatar-initials">{initial}</div>}
          </div>
          <h3 className="admin-display-name">{adminName}</h3>
          <p className="admin-display-role">Admin Owner</p>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item-btn ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}><i className="fa-solid fa-chart-line"></i> Dashboard Overview</button>
          <button className={`nav-item-btn ${activeTab === "inventory" ? "active" : ""}`} onClick={() => setActiveTab("inventory")}><i className="fa-solid fa-warehouse"></i> Inventory Control</button>
          <button className={`nav-item-btn ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}><i className="fa-solid fa-bars-staggered"></i> Order Logs</button>
          <button className={`nav-item-btn ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}><i className="fa-solid fa-gear"></i> Portal Settings</button>
        </nav>
        <button className="admin-logout-btn" onClick={() => navigate("/login")}><i className="fa-solid fa-arrow-right-from-bracket"></i> Exit Portal</button>
      </aside>

      {/* RENDER DYNAMIC COMPONENTS ACCORDING TO ACTIVE TAB */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h1>
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "inventory" && "Inventory Management"}
              {activeTab === "orders" && "Order Logs"}
              {activeTab === "settings" && "Portal System Settings"}
            </h1>
            <p>Administrative operation terminal and logistics hub.</p>
          </div>
          <div className="admin-profile"><span className="profile-badge">Master Control</span></div>
        </header>

        <div className="tab-content-render-window">
          {activeTab === "dashboard" && <OverviewTab products={products} />}
          {activeTab === "inventory" && <InventoryTab products={products} setProducts={setProducts} brands={brands} categories={categories} />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "settings" && <SettingsTab categories={categories} setCategories={setCategories} brands={brands} setBrands={setBrands} />}
        </div>
      </main>
    </div>
  );
}

export default DashboardLanding;