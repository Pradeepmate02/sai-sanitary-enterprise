import React from "react";
import "./OrdersTab.css";

function OrdersTab() {
  return (
    <div className="orders-tab-container">
      <section className="admin-table-section">
        <h2>Complete Fulfilled & Outstanding Logs</h2>
        <div className="empty-logs-wrapper">
          <p>No additional administrative logistics transactions indexed in the current terminal window.</p>
        </div>
      </section>
    </div>
  );
}

export default OrdersTab;