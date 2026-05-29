// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./customer/Customer.css";

// 1. Updated Customer Page Imports
import LoginPage from "./customer/pages/LoginPage";
import CartPage from "./customer/pages/CartPage";
import WishlistPage from "./customer/pages/WishlistPage";
import BuyNowPage from "./customer/pages/BuyNowPage";
import ProductDetails from "./customer/pages/ProductDetails";
import CategoryPage from "./customer/pages/CategoryPage";

// Your custom Home component wrapper can stay inside App.jsx or move
import Navbar from "./customer/components/Navbar";
import Hero from "./customer/components/Hero";
import Categories from "./customer/components/Categories";
import Products from "./customer/components/Products";
import WhyChoose from "./customer/components/WhyChoose";
import Testimonials from "./customer/components/Testimonials";
import Newsletter from "./customer/components/Newsletter";
import Footer from "./customer/components/Footer";

// 2. New Admin Page Imports
import DashboardLanding from "./admin/pages/DashboardLanding";
import NotFound from "./admin/pages/NotFound";

// A quick security layer to check if an admin is logged in
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function Home({ search, setSearch, cart, setCart, wishlist, setWishlist }) {
  return (

    <div className="customer-site">

      <Navbar search={search} setSearch={setSearch} cart={cart} setCart={setCart} wishlist={wishlist} />
      <Hero />
      <Categories />
      <Products search={search} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>


  );
}

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= CUSTOMER ROUTES ================= */}
        <Route path="/" element={<Home search={search} setSearch={setSearch} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/product/:name" element={<ProductDetails search={search} setSearch={setSearch} cart={cart} setCart={setCart} wishlist={wishlist} />} />
        <Route path="/category/:category" element={<CategoryPage search={search} setSearch={setSearch} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} search={search} setSearch={setSearch} wishlist={wishlist} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} search={search} setSearch={setSearch} cart={cart} setCart={setCart} />} />
        <Route path="/buy" element={<BuyNowPage cart={cart} search={search} setSearch={setSearch} />} />
        <Route path="/login" element={<LoginPage search={search} setSearch={setSearch} cart={cart} />} />

        {/* ================= ENTERPRISE ADMIN ROUTES ================= */}
          <Route 
                path="/admin/dashboard" 
                element={
                  // <ProtectedAdminRoute>
                    <DashboardLanding />
                  // </ProtectedAdminRoute>
                } 
            />
      <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;