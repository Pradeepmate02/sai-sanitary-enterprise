// import React from "react";
// import "./OverviewTab.css";

// function OverviewTab({ products }) {
//   const metrics = [
//     { title: "Total Revenue", value: "₹2,45,800", icon: <i className="fa-solid fa-sack-dollar"></i>, change: "+12% this week" },
//     { title: "Active Orders", value: "38", icon: <i className="fa-solid fa-truck-moving"></i>, change: "5 pending dispatch" },
//     { title: "Total Products", value: products.length.toString(), icon: <i className="fa-solid fa-landmark"></i>, change: "Current catalog count" },
//     { title: "Out of Stock", value: products.filter(p => parseInt(p.stock) === 0).length.toString(), icon: <i className="fa-solid fa-triangle-exclamation"></i>, change: "Requires attention" },
//   ];

//   const recentOrders = [
//     { id: "ORD-9482", customer: "Rahul Sharma", item: "PVC Pipe 4-inch", total: "₹4,500", status: "Pending" },
//     { id: "ORD-9481", customer: "Amit Patel", item: "Premium Shower", total: "₹14,997", status: "Delivered" },
//     { id: "ORD-9480", customer: "Priya Nair", item: "Modern Tap x2", total: "₹3,998", status: "Dispatched" },
//   ];

//   return (
//     <div className="overview-tab-container">
//       <section className="metrics-grid">
//         {metrics.map((card, index) => (
//           <div className="metric-card" key={index}>
//             <div className="metric-header">
//               <span className="metric-icon">{card.icon}</span>
//               <h3>{card.title}</h3>
//             </div>
//             <div className="metric-body">
//               <h2>{card.value}</h2>
//               <span className="metric-change">{card.change}</span>
//             </div>
//           </div>
//         ))}
//       </section>

//       <section className="admin-table-section">
//         <h2>Incoming Store Orders</h2>
//         <div className="table-wrapper">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer</th>
//                 <th>Items Purchased</th>
//                 <th>Total Amount</th>
//                 <th>Logistics Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((order, index) => (
//                 <tr key={index}>
//                   <td><strong>{order.id}</strong></td>
//                   <td>{order.customer}</td>
//                   <td>{order.item}</td>
//                   <td>{order.total}</td>
//                   <td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default OverviewTab;

// src/admin/components/OverviewTab.jsx
import React from "react";
import "./OverviewTab.css";

function OverviewTab({ products = [], orders = [] }) {
  // 📈 DYNAMIC CALCULATIONS: Computing real-time stats directly from MongoDB metrics
  
  // 1. Calculate cumulative revenue from all successfully paid or completed transactions
  const totalRevenue = orders.reduce((sum, order) => {
    return order.paymentStatus === "Paid" || order.status === "Delivered"
      ? sum + order.totalAmount
      : sum;
  }, 0);

  // 2. Count active incoming orders (anything not yet fulfilled/declined)
  const activeOrdersCount = orders.filter(
    (order) => order.status !== "Delivered" && order.status !== "Declined"
  ).length;

  // 3. Count distinct products that have fallen to zero stock units
  const outOfStockCount = products.filter(
    (p) => parseInt(p.stock || 0) === 0
  ).length;

  // Compile the dynamic matrix metrics dashboard array
  const metrics = [
    { 
      title: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString("en-IN")}`, 
      icon: <i className="fa-solid fa-sack-dollar"></i>, 
      change: "Live verified collection metrics" 
    },
    { 
      title: "Active Orders", 
      value: activeOrdersCount.toString(), 
      icon: <i className="fa-solid fa-truck-moving"></i>, 
      change: `${orders.filter(o => o.status === "Pending").length} pending dispatch` 
    },
    { 
      title: "Total Products", 
      value: products.length.toString(), 
      icon: <i className="fa-solid fa-landmark"></i>, 
      change: "Current catalog count" 
    },
    { 
      title: "Out of Stock", 
      value: outOfStockCount.toString(), 
      icon: <i className="fa-solid fa-triangle-exclamation"></i>, 
      change: "Requires prompt replenishment" 
    },
  ];

  // 📥 RECENT DATA SLICE: Grab the last 4 structural orders for tracking layout presentation
  const recentOrders = orders.slice(0, 4);

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
        <h2>Incoming Store Orders Activity Log</h2>
        <div className="table-wrapper">
          {recentOrders.length === 0 ? (
            <p style={{ padding: "20px", color: "#64748b" }}>No recent transactional nodes logged.</p>
          ) : (
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
                {recentOrders.map((order, index) => {
                  // Format the items list neatly as a readable string
                  const itemsSummary = order.items
                    .map((item) => `${item.name} (x${item.quantity})`)
                    .join(", ");

                  return (
                    <tr key={order._id || index}>
                      <td><code>{order._id ? order._id.slice(-8).toUpperCase() : `ORD-${index}`}</code></td>
                      <td>
                        <strong>{order.shippingAddress?.fullName || "Guest Account"}</strong>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{order.shippingAddress?.phone}</div>
                      </td>
                      <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {itemsSummary}
                      </td>
                      <td style={{ fontWeight: "600", color: "#0f172a" }}>
                        ₹{order.totalAmount?.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span className={`status-pill ${order.status?.toLowerCase() || "pending"}`}>
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default OverviewTab;