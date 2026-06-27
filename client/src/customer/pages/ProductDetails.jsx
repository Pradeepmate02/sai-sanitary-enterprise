import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";


import productImages from "../utils/productImages";

function ProductDetails({
  search,
  setSearch,
  cart,
  setCart,
}) {
  const { name } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/products/${encodeURIComponent(name)}`
      )
      .then((res) => {
  const image =
    res.data.images?.length > 0 && res.data.images[0]
      ? res.data.images[0]
      : productImages[res.data.name];

  setProduct({
    ...res.data,
    image,
  });

  setSelectedImage(image);
})
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  function addToCart() {
    const existing = cart.find(
      (item) => item.name === product.name
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          name: product.name,
          price: product.price,
          image: selectedImage,
          quantity,
        },
      ]);
    }
  }

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        cart={cart}
      />

      <div className="productDetailContainer">

        <div className="leftProduct">

         <div className="thumbContainer">
  <img
    src={selectedImage}
    alt={product.name}
    className="thumb activeThumb"
  />
</div>

         <div className="mainImage">
  <img
    src={selectedImage}
    alt={product.name}
  />
</div>

        </div>

        <div className="rightProduct">

          <p className="category">
            {product.category?.name}
          </p>

          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          <p>{product.description}</p>

          <div className="featureBox">
            <h3>Product Details</h3>

            <ul>
              <li>✓ Brand : {product.brand?.name}</li>
              <li>✓ Stock : {product.stock}</li>
              <li>✓ SKU : {product.skuId}</li>
              <li>✓ Premium Quality</li>
            </ul>

          </div>

          <div className="quantityBox">

            <button
              onClick={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>

          <div className="productButtons">

            <button
              className="buyBtn"
              onClick={() => {
                addToCart();
                navigate("/buy");
              }}
            >
              Buy Now
            </button>

            <button
              className="cartBtn"
              onClick={addToCart}
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;