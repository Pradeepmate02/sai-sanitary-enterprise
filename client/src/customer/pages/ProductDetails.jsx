import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

// Local image fallback map matrix configuration
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

const productImagesFallback = {
  "PVC Pipe": pvc1,
  "Water Pipe": water1,
  "Premium Shower": shower1,
  "Luxury Sink": sink1,
  "Water Motor": motor1,
  "Submersible Motor": sub1,
  "Plastic Tank": tank1,
  "Sintex Tank": sintex1,
  "Modern Tap": tap1,
  "Pipe Fittings": fitting1,
  "Shopdish": dish1,
};

function ProductDetails({ search, setSearch, cart, setCart }) {
  const { name } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 2000);
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${encodeURIComponent(name)}`)
      .then((res) => {
        // Resolve database path string or pull from local file mapping rules
        const image =
          res.data.images && res.data.images.length > 0 && res.data.images[0]
            ? res.data.images[0]
            : productImagesFallback[res.data.name] || pvc1;

        setProduct({
          ...res.data,
          image,
        });
        setSelectedImage(image);
      })
      .catch((err) => {
        console.error("Failed to pull live product tracking matrix:", err);
      });
  }, [name]);

  if (!product) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", fontWeight: "600", color: "#0F766E" }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: "10px" }}></i>
        Resolving Catalog Item Node...
      </div>
    );
  }

  function addToCart() {
    const existing = cart.find((item) => item.name === product.name);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          _id: product._id, // Required backend identifier cross-link
          name: product.name,
          price: product.price,
          image: selectedImage,
          quantity,
        },
      ]);
    }
    showToast("🛒 Cart configuration updated cleanly");
  }

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <Navbar search={search} setSearch={setSearch} cart={cart} setCart={setCart} />

      <div className="productDetailContainer">
        {/* LEFT COLUMN: MULTI-IMAGE VIEWS */}
        <div className="leftProduct">
          <div className="thumbContainer">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className={selectedImage === img ? "thumb activeThumb" : "thumb"}
                  onClick={() => setSelectedImage(img)}
                />
              ))
            ) : (
              <img src={selectedImage} alt="" className="thumb activeThumb" />
            )}
          </div>

          <div className="mainImage">
            <img src={selectedImage} alt={product.name} />
          </div>
        </div>

        {/* RIGHT COLUMN: CORE PRODUCT DETAILS METRICS */}
        <div className="rightProduct">
          <p className="category">{product.category?.name || "General Catalog"}</p>
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>
          <p className="description">{product.description}</p>

          <div className="featureBox">
            <h3>Product Specifications</h3>
            <ul>
              <li>✓ Brand Profile: {product.brand?.name || "Verified Vendor"}</li>
              <li>✓ Warehouse Stock Status: {product.stock > 0 ? `${product.stock} units remaining` : "Out of Stock"}</li>
              <li>✓ Material SKU: {product.skuId}</li>
              <li>✓ Heavy-Duty Structural Compliance Certified</li>
            </ul>
          </div>

          {/* QUANTITY CONFIGURE MODULE */}
          <div className="quantityBox">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* TRANSITION CONTROLLER LAYOUT TRACKS */}
          <div className="productButtons">
            <button
              className="buyBtn"
              onClick={() => {
                // Pass order metrics directly to checkout state tracking variables
                navigate("/checkout", {
                  state: {
                    buyNowItem: {
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      image: selectedImage,
                      quantity: quantity,
                    },
                  },
                });
              }}
            >
              Buy Now
            </button>
            <button className="cartBtn" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;