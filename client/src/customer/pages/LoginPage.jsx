import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate(location.state?.from || "/");
      }, 800);

    } catch (error) {
      console.log("Login Error:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
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

          <div className="passwordContainer">
  <input
    type={showPassword ? "text" : "password"}
    className="loginInput"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span
    className="passwordToggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
          <button
            className="otpBtn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
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