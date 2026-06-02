// src/admin/components/InventoryTab.jsx
import React, { useState } from "react";
import "./InventoryTab.css";

function InventoryTab({ products, refreshProducts, brands, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", brand: brands[0] || "", category: categories[0] || "", price: "", stock: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return alert("Please fill all fields");

    try {
      //  DATABASE INTEGRATION: POST raw JSON values straight into your backend Express router
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          brand: newProduct.brand,
          category: newProduct.category,
          price: newProduct.price,
          stock: newProduct.stock
        })
      });

      if (response.ok) {
        await refreshProducts(); // Tell parent frame to synchronize state straight from MongoDB
        setNewProduct({ name: "", brand: brands[0] || "", category: categories[0] || "", price: "", stock: "" }); 
        setIsModalOpen(false); 
      } else {
        alert("Failed to preserve inventory record execution on master nodes");
      }
    } catch (error) {
      console.error("Transmission Error:", error);
    }
  };

  const handleDelete = async (skuId) => {
    if (!window.confirm(`Are you certain you want to purge profile node [ ${skuId} ]?`)) return;

    try {
      // 🗑️ DATABASE INTEGRATION: Issue a targeted DELETE parameter matching the SKU string key
      const response = await fetch(`http://localhost:5000/api/products/${skuId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        refreshProducts(); // Force structural re-fetch sync execution loops
      } else {
        alert("Purge request rejected by remote validation engine");
      }
    } catch (error) {
      console.error("Purge Error:", error);
    }
  };

  return (
    <div className="inventory-tab-container">
      <div className="tab-actions-header">
        <h2>Active Catalog Items</h2>
        <button className="admin-add-btn" onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-plus"></i> Add New Product
        </button>
      </div>
      
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>SKU ID</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Units</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td><code>{product.skuId}</code></td>
                <td><strong>{product.name}</strong></td>
                <td><span className="admin-table-brand-tag">{product.brand}</span></td>
                <td>{product.category}</td>
                <td>₹{parseFloat(product.price).toLocaleString("en-IN")}</td>
                <td>
                  <span className={`stock-indicator ${parseInt(product.stock) === 0 ? "out" : parseInt(product.stock) < 15 ? "low" : "good"}`}>
                    {parseInt(product.stock) === 0 ? "Out of Stock 🚨" : `${product.stock} units`}
                  </span>
                </td>
                <td>
                  <button className="admin-delete-inline-btn" onClick={() => handleDelete(product.skuId)}>Remove 🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <h3>Add New Product Catalog Entry</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Product Title / Name</label>
                <input type="text" placeholder="e.g., Heavy Duty Pipe" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Manufacturer / Brand</label>
                  <select value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}>
                    {brands.map((brnd, idx) => <option key={idx} value={brnd}>{brnd}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                    {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (INR)</label>
                  <input type="number" placeholder="Value in ₹" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Initial Stock</label>
                  <input type="number" placeholder="Quantity" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryTab;