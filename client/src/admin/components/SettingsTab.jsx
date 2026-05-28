import React, { useState } from "react";
import "./SettingsTab.css";

function SettingsTab({ categories, setCategories, brands, setBrands }) {
  const [customCategory, setCustomCategory] = useState("");
  const [customBrand, setCustomBrand] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!customCategory.trim()) return;
    if (categories.includes(customCategory.trim())) return alert("Category already exists");
    setCategories([...categories, customCategory.trim()]);
    setCustomCategory("");
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!customBrand.trim()) return;
    if (brands.includes(customBrand.trim())) return alert("Brand already exists");
    setBrands([...brands, customBrand.trim()]);
    setCustomBrand("");
  };

  return (
    <div className="admin-settings-grid">
      <div className="settings-card">
        <h3>Configure Categories</h3>
        <p className="settings-card-desc">Add custom categories to categorize your architectural components.</p>
        <form onSubmit={handleAddCategory} className="settings-inline-form">
          <input type="text" placeholder="e.g., Faucets & Taps" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />
          <button type="submit" className="settings-add-btn">Add</button>
        </form>
        <div className="settings-badge-list">
          {categories.map((cat, idx) => <span key={idx} className="settings-item-badge">🏷️ {cat}</span>)}
        </div>
      </div>

      <div className="settings-card">
        <h3>Configure Brands</h3>
        <p className="settings-card-desc">Add manufacturing profiles to track structural providers.</p>
        <form onSubmit={handleAddBrand} className="settings-inline-form">
          <input type="text" placeholder="e.g., Hindware" value={customBrand} onChange={(e) => setCustomBrand(e.target.value)} />
          <button type="submit" className="settings-add-btn">Add</button>
        </form>
        <div className="settings-badge-list">
          {brands.map((brnd, idx) => <span key={idx} className="settings-item-badge">🏭 {brnd}</span>)}
        </div>
      </div>
    </div>
  );
}

export default SettingsTab;