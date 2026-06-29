// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage({ cart, setCart }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle items checked out directly via 'Buy Now' versus standard shopping cart context
  const checkoutItems = location.state?.buyNowItem ? [location.state.buyNowItem] : cart;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD or UPI
  const [processing, setProcessing] = useState(false);

  const orderTotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.postalCode) {
      alert("Please populate required destination fields.");
      return;
    }

    setProcessing(true);

    try {
      const token = localStorage.getItem("token"); // Assuming your secure hash token is saved here
      const orderPayload = {
        items: checkoutItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity
        })),
        shippingAddress: address,
        paymentMethod
      };
const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Success! Order verified and generated. ID: ${data.order._id}`);
        if (!location.state?.buyNowItem) {
          setCart([]); // Clean out full client shopping bag on success
        }
        navigate("/");
      } else {
        alert(`Error compiling transaction flow: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network server connection timeout exception.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-column">
        <h2>📋 Delivery Shipping Details</h2>
        <form onSubmit={handlePlaceOrder}>
          <div className="form-group">
            <label>Recipient Full Name</label>
            <input type="text" name="fullName" required value={address.fullName} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone Contact</label>
              <input type="text" name="phone" required value={address.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Postal Pincode</label>
              <input type="text" name="postalCode" required value={address.postalCode} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Street Address Line</label>
            <input type="text" name="addressLine" required value={address.addressLine} onChange={handleInputChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" required value={address.city} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" required value={address.state} onChange={handleInputChange} />
            </div>
          </div>

          <h2 style={{ marginTop: "30px" }}>💳 Select Payment Channel</h2>
          <div className="payment-selector-grid">
            <label className={`payment-option-card ${paymentMethod === "COD" ? "selected" : ""}`}>
              <input type="radio" name="payment" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
              <div>
                <strong>Cash On Delivery (COD)</strong>
                <p>Pay physically via hard currency at your doorstep</p>
              </div>
            </label>

            <label className={`payment-option-card ${paymentMethod === "UPI" ? "selected" : ""}`}>
              <input type="radio" name="payment" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
              <div>
                <strong>Instant UPI Node (GPay / PhonePe)</strong>
                <p>Verify payments safely using live banking intent apps</p>
              </div>
            </label>
          </div>

          <button type="submit" className="place-order-submit-btn" disabled={processing}>
            {processing ? "Validating Nodes..." : `Complete Purchase — Total: ₹${orderTotal}`}
          </button>
        </form>
      </div>

      <div className="checkout-summary-column">
        <h3>Order Invoice Manifest</h3>
        <div className="summary-items-scroll">
          {checkoutItems.map((item, idx) => (
            <div className="summary-item-row" key={idx}>
              <div>
                <h4>{item.name}</h4>
                <p>Quantity Breakdown: {item.quantity}</p>
              </div>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="summary-total-display">
          <span>Grand Final Payable:</span>
          <strong>₹{orderTotal}</strong>
        </div>
      </div>
    </div>
  );
}