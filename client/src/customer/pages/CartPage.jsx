import React from "react";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function CartPage({ cart, setCart, search, setSearch }) {
  console.log(cart);
  const navigate = useNavigate();

  function increase(name) {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrease(name) {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  function remove(name) {
    setCart(cart.filter((item) => item.name !== name));
  }

  // 🔒 FIXED: Reusable authentication guard function
  const checkAuthAndNavigate = (targetPath, statePayload = null) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to proceed with your order!");
      navigate("/login");
      return false;
    }
    
    // Check if a payload exists before passing it to avoid silent route crashes
    if (statePayload) {
      navigate(targetPath, statePayload);
    } else {
      navigate(targetPath); // Clean redirection for standard cart checkouts
    }
    return true;
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} cart={cart} setCart={setCart} />

      <div className="cartPage">
        <h1>🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "50px",
                borderRadius: "30px",
                width: "500px",
                textAlign: "center",
                boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                alt="Empty Cart"
                style={{ width: "220px", marginBottom: "25px" }}
              />
              <h2 style={{ fontSize: "42px", marginBottom: "15px", color: "#1f2937" }}>
                Your Cart Is Empty
              </h2>
              <p style={{ fontSize: "18px", color: "#6b7280", lineHeight: "1.7", marginBottom: "30px" }}>
                Looks like you haven't added any products yet. Start exploring premium collections.
              </p>
              <button className="btn" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                className="cartCard"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${item.name}`)}
              >
                <img src={item.image || item.thumbnail} alt={item.name} />

                <div>
                  <h2>{item.name}</h2>
                  <h3>₹{item.price}</h3>
                  <p>Qty : {item.quantity}</p>

                  <div className="cartButtons">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        increase(item.name);
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        decrease(item.name);
                      }}
                    >
                      -
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(item.name);
                      }}
                    >
                      ❌
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        checkAuthAndNavigate("/checkout", {
                          state: { buyNowItem: item },
                        });
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cartSummarySection">
              <h1>Total: ₹{total}</h1>
              
              <button
                className="btn"
                onClick={() => checkAuthAndNavigate("/checkout")}
              >
                Proceed to Checkout ➔
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartPage;