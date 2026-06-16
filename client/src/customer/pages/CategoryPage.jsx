
import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./CategoryPage.css";


import pvc1 from "../assets/products/pvc-pipe/pvc1.jpg";
import water1 from "../assets/products/water-pipe/water1.jpg";
import shower1 from "../assets/products/shower/shower1.jpg";
import sink1 from "../assets/products/sink/sink1.jpg";
import motor1 from "../assets/products/motor/motor1.jpg";
import sub1 from "../assets/products/submersible-motor/sub1.jpg";
import tank1 from "../assets/products/plastic-tank/tank1.jpg";
import sintex1 from "../assets/products/sintex-tank/sintex1.jpg";
import tap1 from "../assets/products/tap/tap1.jpg";
import fitting1 from "../assets/products/pipe-fitting/fitting1.jpg";
import dish1 from "../assets/products/shopdish/shopdish1.jpg";

const CATEGORY_META = {
  pipes: {
    title: "Pipes",
    subtitle: "Durable plumbing and water supply essentials",
  },
  bathroom: {
    title: "Bathroom",
    subtitle: "Modern fittings for everyday comfort",
  },
  kitchen: {
    title: "Kitchen",
    subtitle: "Smart and premium kitchen essentials",
  },
  motors: {
    title: "Motors",
    subtitle: "Reliable water pumping solutions",
  },
  "water-tanks": {
    title: "Water Tanks",
    subtitle: "Storage solutions built for long life",
  },
};

const createProduct = (
  name,
  price,
  rating,
  image,
  {
    oldPrice = Math.round(price * 1.18),
    stock = 18,
    discount = Math.max(5, Math.round(((oldPrice - price) / oldPrice) * 100)),
    badge = "Best Seller",
    brand = "Sai Sanitary",
    delivery = "3-5 Days",
  } = {}
) => ({
  name,
  price,
  rating,
  image,
  oldPrice,
  stock,
  discount,
  badge,
  brand,
  delivery,
});

const CATEGORY_PRODUCTS = {
  pipes: [
    createProduct("PVC Pipe", 999, 4.5, pvc1, {
      stock: 35,
      badge: "Popular Choice",
    }),
    createProduct("Water Pipe", 1499, 4.7, water1, {
      stock: 22,
      badge: "Top Rated",
    }),
    createProduct("Pipe Fittings", 799, 4.5, fitting1, {
      stock: 48,
      badge: "Value Pack",
    }),
  ],
  bathroom: [
    createProduct("Premium Shower", 4999, 4.8, shower1, {
      stock: 11,
      badge: "Premium",
    }),
    createProduct("Modern Tap", 1999, 4.7, tap1, {
      stock: 26,
      badge: "Trending",
    }),
    createProduct("Shopdish", 2499, 4.6, dish1, {
      stock: 14,
      badge: "New Arrival",
    }),
  ],
  kitchen: [
    createProduct("Luxury Sink", 2999, 4.6, sink1, {
      stock: 19,
      badge: "Premium",
    }),
    createProduct("Modern Tap", 1999, 4.7, tap1, {
      stock: 26,
      badge: "Trending",
    }),
  ],
  motors: [
    createProduct("Water Motor", 5999, 4.9, motor1, {
      stock: 8,
      badge: "High Performance",
    }),
    createProduct("Submersible Motor", 7999, 4.7, sub1, {
      stock: 6,
      badge: "Heavy Duty",
    }),
  ],
  "water-tanks": [
    createProduct("Plastic Tank", 3499, 4.5, tank1, {
      stock: 16,
      badge: "Durable",
    }),
    createProduct("Sintex Tank", 6999, 4.8, sintex1, {
      stock: 9,
      badge: "Premium",
    }),
  ],
};

function CategoryPage({
  search = "",
  setSearch = () => {},
  cart = [],
  setCart = () => {},
  wishlist = [],
  setWishlist = () => {},
}) {
  const navigate = useNavigate();
  const { category } = useParams();

  const [sortBy, setSortBy] = useState("relevance");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [toast, setToast] = useState("");

  const categoryKey = category || "";
  const categoryInfo =
    CATEGORY_META[categoryKey] || {
      title: categoryKey || "Collection",
      subtitle: "Explore our products",
    };

  const allProducts = CATEGORY_PRODUCTS[categoryKey] || [];

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = allProducts.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q);

      const matchesRating = item.rating >= minRating;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under1000" && item.price < 1000) ||
        (priceRange === "1000to3000" &&
          item.price >= 1000 &&
          item.price <= 3000) ||
        (priceRange === "above3000" && item.price > 3000);

      const matchesStock = !onlyInStock || item.stock > 0;

      return matchesSearch && matchesRating && matchesPrice && matchesStock;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-high") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [allProducts, search, minRating, priceRange, onlyInStock, sortBy]);

  function addToCart(product) {
    if (typeof setCart !== "function") return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name);

      if (existing) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
    setToast("🛒 Added to Cart");

setTimeout(() => {
  setToast("");
}, 2000);
  }

  function toggleWishlist(product) {
  if (typeof setWishlist !== "function") return;

  const exists = wishlist.some(
    (item) => item.name === product.name
  );

  if (exists) {

    setWishlist(
      wishlist.filter(
        (item) => item.name !== product.name
      )
    );

    setToast("❌ Removed from Wishlist");

  } else {

    setWishlist([
      ...wishlist,
      product
    ]);

    setToast("❤️ Added to Wishlist");

  }

  setTimeout(() => {
    setToast("");
  }, 2000);
}

  function goToProduct(name) {
    navigate(`/product/${encodeURIComponent(name)}`);
  }

  function resetFilters() {
    setSortBy("relevance");
    setMinRating(0);
    setPriceRange("all");
    setOnlyInStock(false);
    setSearch("");
  }

  return (
  <>
    <Navbar
      search={search}
      setSearch={setSearch}
      cart={cart}
      wishlist={wishlist}
    />

    {toast && (
      <div className="toast">
        {toast}
      </div>
    )}

    <div className="categoryPage">
        <div className="categoryHeader">
          <div>
            <p className="categoryBreadcrumb">Home / {categoryInfo.title}</p>
            <h1>{categoryInfo.title}</h1>
            <p className="categorySubtitle">{categoryInfo.subtitle}</p>
          </div>

          <div className="categoryCountBox">
            <span className="categoryCount">{filteredProducts.length}</span>
            <span className="categoryCountLabel">Products Found</span>
          </div>
        </div>

        <div className="categoryLayout">
          <aside className="filtersSidebar">
            <div className="filterSection">
              <h3>Sort By</h3>
              <select
                className="filterSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            <div className="filterSection">
              <h3>Price Range</h3>
              <label className="filterOption">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange === "all"}
                  onChange={() => setPriceRange("all")}
                />
                All Prices
              </label>
              <label className="filterOption">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange === "under1000"}
                  onChange={() => setPriceRange("under1000")}
                />
                Under ₹1,000
              </label>
              <label className="filterOption">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange === "1000to3000"}
                  onChange={() => setPriceRange("1000to3000")}
                />
                ₹1,000 - ₹3,000
              </label>
              <label className="filterOption">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange === "above3000"}
                  onChange={() => setPriceRange("above3000")}
                />
                Above ₹3,000
              </label>
            </div>

            <div className="filterSection">
              <h3>Rating</h3>
              <label className="filterOption">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                />
                All Ratings
              </label>
              <label className="filterOption">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4}
                  onChange={() => setMinRating(4)}
                />
                4★ & above
              </label>
              <label className="filterOption">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4.5}
                  onChange={() => setMinRating(4.5)}
                />
                4.5★ & above
              </label>
            </div>

            <div className="filterSection">
              <h3>Availability</h3>
              <label className="filterOption">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                In Stock Only
              </label>
            </div>

            <button className="resetFilterBtn" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          <section className="productsArea">
            {filteredProducts.length > 0 ? (
              <div className="categoryProducts">
                {filteredProducts.map((item) => {
                  const inWishlist = wishlist.some((p) => p.name === item.name);

                  return (
                    <div className="categoryCard" key={item.name}>
                      <button
                        className={`wishlistBtn ${inWishlist ? "active" : ""}`}
                        onClick={() => toggleWishlist(item)}
                        aria-label="Toggle wishlist"
                      >
                        {inWishlist ? "❤️" : "🤍"}
                      </button>

                      <div className="productBadge">{item.badge}</div>

                      <div
                        className="cardImageWrap"
                        onClick={() => goToProduct(item.name)}
                      >
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="cardContent">
                        <p className="cardBrand">{item.brand}</p>

                        <h3 onClick={() => goToProduct(item.name)}>
                          {item.name}
                        </h3>

                        <div className="ratingRow">
                          <span className="ratingStars">
                            {"★".repeat(Math.floor(item.rating))}
                            {item.rating % 1 !== 0 ? "☆" : ""}
                          </span>
                          <span className="ratingValue">{item.rating}</span>
                          <span className="reviewCount">(120)</span>
                        </div>

                        <div className="priceRow">
                          <p className="currentPrice">₹{item.price}</p>
                          <p className="oldPrice">₹{item.oldPrice}</p>
                          <span className="discountTag">{item.discount}% OFF</span>
                        </div>

                        <div className="stockRow">
                          <span
                            className={
                              item.stock > 0 ? "stockIn" : "stockOut"
                            }
                          >
                            {item.stock > 0
                              ? `In Stock (${item.stock})`
                              : "Out of Stock"}
                          </span>
                          <span className="deliveryTag">
                            Delivery: {item.delivery}
                          </span>
                        </div>

                        <div className="cardButtons">
                          <button
                            className="viewDetailsBtn"
                            onClick={() => goToProduct(item.name)}
                          >
                            View Details
                          </button>

                          <button
                            className="addCartBtn"
                            onClick={() => addToCart(item)}
                            disabled={item.stock <= 0}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="emptyState">
                <h2>No products found 🔍</h2>
                <p>Try changing filters or search terms.</p>
                <button className="resetFilterBtn" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CategoryPage;