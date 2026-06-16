import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaArrowUp
} from "react-icons/fa";

function Footer() {

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-section">
          <h2>SAI SANITARY</h2>

          <p>
            Premium sanitaryware, bathroom accessories,
            kitchen fittings, and plumbing solutions
            for homes and businesses.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li onClick={() => navigate("/")}>
              Home
            </li>

            <li onClick={() => navigate("/about")}>
  About Us
</li>

<li onClick={() => navigate("/contact")}>
  Contact Us
</li>

            <li onClick={() => navigate("/cart")}>
              Cart
            </li>

            <li onClick={() => navigate("/wishlist")}>
              Wishlist
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>

          <ul>
            <li onClick={() => navigate("/category/pipes")}>
              Pipes
            </li>

            <li onClick={() => navigate("/category/bathroom")}>
              Bathroom
            </li>

            <li onClick={() => navigate("/category/motors")}>
              Motors
            </li>

            <li onClick={() => navigate("/category/water-tanks")}>
              Water Tanks
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>📞 6206087188</p>
          <p>📞 8340144480</p>

          <p>📧 shubhamk4247@gmail.com</p>

          <p>
            📍 Tandwa Road, Daily Market,
            Barkagaon, Hazaribagh,
            Jharkhand
          </p>

          <p>Return Policy: 2 Days</p>
          <p>Payment: Online / Cash</p>

          <div className="social-icons">

  <a href="#" aria-label="Facebook">
    <FaFacebookF />
  </a>

  <a href="#" aria-label="Instagram">
    <FaInstagram />
  </a>

  <a
    href="https://wa.me/916206087188"
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
  >
    <FaWhatsapp />
  </a>

  <a href="#" aria-label="LinkedIn">
    <FaLinkedin />
  </a>

</div>
        </div>

      </div>

      <button
        className="backToTop"
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>

      <div className="footer-bottom">
        © 2026 SAI SANITARY. Word Lane Tech.
      </div>

    </footer>
  );
}

export default Footer;