// src/customer/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="customer-site" style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🔍</div>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          Oops! The page you are looking for doesn't exist or has been moved to another section.
        </p>
        <button style={styles.btn} onClick={() => navigate("/")}>
          🏠 Back to Homepage
        </button>
      </div>
    </div>
  );
}

// Clean inline styles to keep it independent and safe from layout breaks
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7f8",
    padding: "20px",
  },
  card: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "50px 40px",
    borderRadius: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,.08)",
    maxWidth: "500px",
    width: "100%",
  },
  icon: {
    fontSize: "70px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "90px",
    fontWeight: "800",
    color: "#0F766E",
    lineHeight: "1",
    margin: "0 0 10px 0",
  },
  subtitle: {
    fontSize: "28px",
    color: "#1f2937",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  btn: {
    padding: "14px 30px",
    border: "none",
    borderRadius: "30px",
    background: "#0F766E",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: ".3s",
  },
};

export default NotFound;