import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function LoginPage({ search, setSearch, cart = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    // Prevent multiple clicks
    if (loading) return;

    // Check empty fields
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // Swapped out hardcoded url with your dynamic Vite env property lane
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: email.trim(),
          password,
        }
      );

      // Save credentials safely to your app cache
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      localStorage.setItem("userRole", response.data.user.role);

      alert("Login Successful!");

      // 🔄 AUTOMATIC ROLE-BASED REDIRECTION INTERCEPTOR
      if (response.data.user.role === "admin") {
        navigate("/admin"); // Sends admin directly to System Control Terminal
      } else {
        navigate("/"); // Sends normal users to customer storefront
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data);
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        cart={cart}
      />

      <div className="loginContainer">
        <div className="loginCard">
          <h2>Login</h2>

          {location.state?.message && (
            <div className="loginMessage">
              {location.state.message}
            </div>
          )}

          <input
            type="email"
            className="loginInput"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="otpBtn" onClick={handleLogin}>
            Login
          </button>

          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="socialBtns">
            <button disabled>
              <FaFacebook />
              Facebook
            </button>

            <button disabled>
              <FaGoogle />
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;