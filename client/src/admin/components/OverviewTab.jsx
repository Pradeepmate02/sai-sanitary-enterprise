import React from "react";
import "./OverviewTab.css";

function OverviewTab({ products }) {
  const metrics = [
    { title: "Total Revenue", value: "₹2,45,800", icon: <i className="fa-solid fa-sack-dollar"></i>, change: "+12% this week" },
    { title: "Active Orders", value: "38", icon: <i className="fa-solid fa-truck-moving"></i>, change: "5 pending dispatch" },
    { title: "Total Products", value: products.length.toString(), icon: <i className="fa-solid fa-landmark"></i>, change: "Current catalog count" },
    { title: "Out of Stock", value: products.filter(p => parseInt(p.stock) === 0).length.toString(), icon: <i className="fa-solid fa-triangle-exclamation"></i>, change: "Requires attention" },
  ];

  const recentOrders = [
    { id: "ORD-9482", customer: "Rahul Sharma", item: "PVC Pipe 4-inch", total: "₹4,500", status: "Pending" },
    { id: "ORD-9481", customer: "Amit Patel", item: "Premium Shower", total: "₹14,997", status: "Delivered" },
    { id: "ORD-9480", customer: "Priya Nair", item: "Modern Tap x2", total: "₹3,998", status: "Dispatched" },
  ];

  return (
    <div className="overview-tab-container">
      <section className="metrics-grid">
        {metrics.map((card, index) => (
          <div className="metric-card" key={index}>
            <div className="metric-header">
              <span className="metric-icon">{card.icon}</span>
              <h3>{card.title}</h3>
            </div>
            <div className="metric-body">
              <h2>{card.value}</h2>
              <span className="metric-change">{card.change}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-table-section">
        <h2>Incoming Store Orders</h2>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Purchased</th>
                <th>Total Amount</th>
                <th>Logistics Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.item}</td>
                  <td>{order.total}</td>
                  <td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default OverviewTab;