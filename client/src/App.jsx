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

// Customer Pages
import LoginPage from "./customer/pages/LoginPage";
import CartPage from "./customer/pages/CartPage";
import WishlistPage from "./customer/pages/WishlistPage";
import BuyNowPage from "./customer/pages/BuyNowPage";
import AboutPage from "./customer/pages/AboutPage";
import ContactPage from "./customer/pages/ContactPage";
import ProductDetails from "./customer/pages/ProductDetails";
import CategoryPage from "./customer/pages/CategoryPage";

// Future Pages (not created yet)
// import ProfilePage from "./customer/pages/ProfilePage";
// import OrdersPage from "./customer/pages/OrdersPage";
// import NotFoundPage from "./customer/pages/NotFoundPage";

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

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Future Routes */}
        {/*
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        */}

        {/* Admin */}
        <Route path="/admin" element={<DashboardLanding />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;