
import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";


function LoginPage({ search, setSearch, cart = [] }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful!");
      navigate("/");
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

          <input
            type="email"
            className="loginInput"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="loginInput"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
  className="otpBtn"
  onClick={handleLogin}
>
  Login
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

