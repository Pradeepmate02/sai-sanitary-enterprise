// src/admin/components/SettingsTab.jsx
import React, { useState } from "react";
import "./SettingsTab.css";

function SettingsTab({ categories, brands, refreshSettings }) {
  const [customCategory, setCustomCategory] = useState("");
  const [customBrand, setCustomBrand] = useState("");

  //  DATABASE INTEGRATION: POST New Category Node
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const cleanCategory = customCategory.trim();
    if (!cleanCategory) return;
    
    if (categories.includes(cleanCategory)) {
      return alert("This category is already indexed in the system");
    }

    try {
      const response = await fetch("http://localhost:5000/api/settings/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanCategory })
      });

      if (response.ok) {
        await refreshSettings(); // Tell parent shell to sync global state from MongoDB
        setCustomCategory("");
      } else {
        alert("Server rejected the new category insertion tracking node");
      }
    } catch (error) {
      console.error("Category Sync Error:", error);
    }
  };

  // 🔵 DATABASE INTEGRATION: POST New Manufacturing Brand
  const handleAddBrand = async (e) => {
    e.preventDefault();
    const cleanBrand = customBrand.trim();
    if (!cleanBrand) return;

    if (brands.includes(cleanBrand)) {
      return alert("This brand profile is already indexed in the system");
    }

    try {
      const response = await fetch("http://localhost:5000/api/settings/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanBrand })
      });

      if (response.ok) {
        await refreshSettings(); // Sync parent data state arrays dynamically
        setCustomBrand("");
      } else {
        alert("Server rejected the new brand profile configuration tracking node");
      }
    } catch (error) {
      console.error("Brand Sync Error:", error);
    }
  };

  return (
    <div className="admin-settings-grid">
      
      {/* CATEGORY OPERATION PANEL CARD */}
      <div className="settings-card">
        <h3>Configure Categories</h3>
        <p className="settings-card-desc">Add custom categories to categorize your architectural components.</p>
        
        <form onSubmit={handleAddCategory} className="settings-inline-form">
          <input 
            type="text" 
            placeholder="e.g., Faucets & Taps" 
            value={customCategory} 
            onChange={(e) => setCustomCategory(e.target.value)} 
          />
          <button type="submit" className="settings-add-btn">Add</button>
        </form>
        
        <div className="settings-badge-list">
          {categories.map((cat, idx) => (
            <span key={idx} className="settings-item-badge">
              <i className="fa-solid fa-tag" style={{ fontSize: "11px", color: "#64748b" }}></i> {cat}
            </span>
          ))}
        </div>
      </div>

      {/* MANUFACTURING BRAND PANEL CARD */}
      <div className="settings-card">
        <h3>Configure Brands</h3>
        <p className="settings-card-desc">Add manufacturing profiles to track structural providers.</p>
        
        <form onSubmit={handleAddBrand} className="settings-inline-form">
          <input 
            type="text" 
            placeholder="e.g., Hindware" 
            value={customBrand} 
            onChange={(e) => setCustomBrand(e.target.value)} 
          />
          <button type="submit" className="settings-add-btn">Add</button>
        </form>
        
        <div className="settings-badge-list">
          {brands.map((brnd, idx) => (
            <span key={idx} className="settings-item-badge">
              <i className="fa-solid fa-file-contract" style={{ fontSize: "11px", color: "#64748b" }}></i> {brnd}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default SettingsTab;