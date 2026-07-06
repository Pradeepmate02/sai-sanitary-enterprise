// src/admin/components/InventoryTab.jsx
import React, { useState } from "react";
import "./InventoryTab.css";

function InventoryTab({ products, refreshProducts, brands, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    description: "",
    brand: brands[0] || "", 
    category: categories[0] || "", 
    price: "", 
    stock: "",
    minStockThreshold: "15",
    imageUrl: "" 
  });

  // Dynamic API base URL resolution mapping rule
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return alert("Please fill all required fields");

    // 🛠️ FIXED: Pulls token using the exact key defined during your login setup
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          brandName: newProduct.brand, 
          categoryName: newProduct.category, 
          price: newProduct.price,
          stock: newProduct.stock,
          minStockThreshold: newProduct.minStockThreshold,
          images: newProduct.imageUrl ? [newProduct.imageUrl] : [] 
        })
      });

      if (response.ok) {
        await refreshProducts(); 
        setNewProduct({ name: "", description: "", brand: brands[0] || "", category: categories[0] || "", price: "", stock: "", minStockThreshold: "15", imageUrl: "" }); 
        setIsModalOpen(false); 
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to preserve inventory record execution on master nodes");
      }
    } catch (error) {
      console.error("Transmission Error:", error);
    }
  };

  const handleDelete = async (skuId) => {
    if (!window.confirm(`Are you certain you want to permanently purge product node [ ${skuId} ]?`)) return;

    // 🛠️ FIXED: Pulls token using the exact key defined during your login setup
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/products/${skuId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        refreshProducts(); 
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
                <td><span className="admin-table-brand-tag">{product.brand?.name || "N/A"}</span></td>
                <td>{product.category?.name || "N/A"}</td>
                <td>₹{parseFloat(product.price).toLocaleString("en-IN")}</td>
                <td>
                  <span className={`stock-indicator ${
                    parseInt(product.stock) === 0 
                      ? "out" 
                      : parseInt(product.stock) <= parseInt(product.minStockThreshold || 15) 
                      ? "low" 
                      : "good"
                  }`}>
                    {parseInt(product.stock) === 0 ? "Out of Stock" : `${product.stock} units`}
                  </span>
                </td>
                <td>
                  <button className="admin-delete-inline-btn" onClick={() => handleDelete(product.skuId)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: "520px" }}>
            <h3>Add New Product Catalog Entry</h3>
            <form onSubmit={handleFormSubmit}>
              
              <div className="form-group">
                <label>Product Title / Name *</label>
                <input type="text" placeholder="e.g., Heavy Duty Pipe" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Detailed Description</label>
                <textarea 
                  style={{ padding: "10px 14px", fontSize: "14px", border: "1px solid #e2e8f0", borderRadius: "6px", outline: "none", resize: "none", height: "60px", fontFamily: "inherit" }}
                  placeholder="Enter components usage rules, dimension tracking matrices..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
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
                  <label>Price (INR) *</label>
                  <input type="number" min="0" placeholder="Value in ₹" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Initial Stock *</label>
                  <input type="number" min="0" placeholder="Quantity" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Low-Stock Alert Level</label>
                  <input type="number" min="0" placeholder="Default is 15" value={newProduct.minStockThreshold} onChange={(e) => setNewProduct({ ...newProduct, minStockThreshold: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Product Image Link URL</label>
                  <input type="url" placeholder="https://example.com/image.jpg" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
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