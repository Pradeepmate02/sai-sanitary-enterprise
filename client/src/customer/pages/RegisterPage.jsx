import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage({ search, setSearch, cart = [] }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
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

          <input
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="otpBtn"
            onClick={handleRegister}
          >
            Register
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