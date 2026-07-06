// src/App.jsx

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// Customer Facing Layout Components
import Navbar from "./customer/components/Navbar";
import Hero from "./customer/components/Hero";
import Categories from "./customer/components/Categories";
import Products from "./customer/components/Products";
import WhyChoose from "./customer/components/WhyChoose";
import Testimonials from "./customer/components/Testimonials";
import Newsletter from "./customer/components/Newsletter";
import Footer from "./customer/components/Footer";
import { Toaster } from "react-hot-toast";


// Customer Pages
import LoginPage from "./customer/pages/LoginPage";
import CartPage from "./customer/pages/CartPage";
import WishlistPage from "./customer/pages/WishlistPage";
import BuyNowPage from "./customer/pages/BuyNowPage";
import AboutPage from "./customer/pages/AboutPage";
import ContactPage from "./customer/pages/ContactPage";
import ProductDetails from "./customer/pages/ProductDetails";
import CategoryPage from "./customer/pages/CategoryPage";
import RegisterPage from "./customer/pages/RegisterPage";

// ➕ IMPORT YOUR NEW CHECKOUT PAGE HERE
import CheckoutPage from "./customer/pages/CheckoutPage"; 

// Admin
import DashboardLanding from "./admin/pages/DashboardLanding";

function Home({
  search,
  setSearch,
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {
  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
      />
      <Hero />
      <Categories />
      <Products
        search={search}
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}

function App() {
  const [search, setSearch] = useState("");

  // Cart Persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist Persistence
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <BrowserRouter>
    <Toaster
  position="top-center"
  toastOptions={{
    duration: 2500,
    style: {
      borderRadius: "10px",
      background: "#0F766E",
      color: "#fff",
      fontWeight: "500",
    },
  }}
/>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        {/* Product Details */}
        <Route
          path="/product/:name"
          element={
            <ProductDetails
              search={search}
              setSearch={setSearch}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
            />
          }
        />

        {/* Category */}
        <Route
          path="/category/:category"
          element={
            <CategoryPage
              search={search}
              setSearch={setSearch}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              setCart={setCart}
              search={search}
              setSearch={setSearch}
              wishlist={wishlist}
            />
          }
        />

        {/* ➕ ADD THE SECURED CHECKOUT ROUTE LINK HERE */}
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlist={wishlist}
              setWishlist={setWishlist}
              search={search}
              setSearch={setSearch}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Buy Now */}
        <Route
          path="/buy"
          element={
            <BuyNowPage
              cart={cart}
              setCart={setCart}
              search={search}
              setSearch={setSearch}
            />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <LoginPage
              search={search}
              setSearch={setSearch}
              cart={cart}
            />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <RegisterPage
              search={search}
              setSearch={setSearch}
              cart={cart}
            />
          }
        />

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin */}
        <Route path="/admin" element={<DashboardLanding />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;