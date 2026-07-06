import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage({ search, setSearch, cart = [] }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) return;

    // Empty fields
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Name validation
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters.");
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
        "http://localhost:5000/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );

      toast.success(
        response.data.message || "Registration Successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      console.log("Register Error:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
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

          <h2>Create Account</h2>

          <input
            type="text"
            className="loginInput"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <button
            className="otpBtn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default RegisterPage;