import React,{useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./ProductDetails.css";

import products from "./products";



function ProductDetails({

search,
setSearch,
cart,
setCart

}){



const {name}=useParams();

const navigate=useNavigate();

const product = products.find(
  item => item.name === decodeURIComponent(name)
);
if(!product){

return <h1>Product Not Found</h1>

}



const [selectedImage,setSelectedImage] =
useState(product.images[0]);

useEffect(() => {
  setSelectedImage(product.images[0]);
}, [product]);
const [quantity,setQuantity]=useState(1);

useEffect(() => {
  setQuantity(1);
}, [product]);
function addToCart(){

const existing =
(cart || []).find(
item => item.name === product.name
);

if(existing){

setCart(

cart.map(item=>

item.name===product.name

?

{
...item,
quantity:item.quantity+quantity
}

:

item

)

);

}

else{

setCart([
  ...(cart || []),

{
name:product.name,
price:product.price,
image:product.thumbnail,
quantity
}

]);

}

}

return(

<>

<Navbar
search={search}
setSearch={setSearch}
cart={cart}
/>

<div className="productDetailContainer">

<div className="leftProduct">

<div className="thumbContainer">

{

product.images.map(

(img,index)=>(

<img
key={index}
src={img}
alt={`${product.name} ${index + 1}`}
className={
selectedImage===img
?
"thumb activeThumb"
:
"thumb"
}
onClick={()=>
setSelectedImage(img)
}
/>

)

)

}

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

PREMIUM COLLECTION

</p>

<h1>{product.name}</h1>

<div className="ratingSection">

⭐ {product.rating}

<span>
({product.reviews} Reviews)
</span>

</div>

<div className="stockBadge">

{product.stock > 0

? "✅ In Stock"

: "❌ Out Of Stock"}

</div>

<div className="priceSection">

<h2>₹{product.price}</h2>

<span className="oldPrice">
₹{product.oldPrice}
</span>

<span className="discountBadge">
{product.discount}% OFF
</span>

</div>
<p>{product.description}</p>

<div className="trustBox">

  <div>🚚 Free Delivery</div>

  <div>🛡️ Warranty Included</div>

  <div>🔒 Secure Payment</div>

  <div>↩️ Easy Returns</div>

</div>

<div className="featureBox">

<h3>Features</h3>

<div className="featureGrid">

{

product.features.map(

(item,index)=>(

<div
key={index}
className="featureCard"
>

✓ {item}

</div>

)

)

}

</div>

</div>
<div className="quantityBox">

<button
onClick={()=>
setQuantity(
Math.max(1,quantity-1)
)
}
>
-
</button>

<span>{quantity}</span>

<button
onClick={()=>
setQuantity(quantity+1)
}
>
+
</button>

</div>

<div className="productButtons">

<button
className="buyBtn"
onClick={() =>
navigate("/buy",{
state:{
items:[
{
name:product.name,
price:product.price,
image:product.thumbnail,
quantity
}
]
}
})
}
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

</div> {/* rightProduct */}

</div> {/* productDetailContainer */}


<div className="specifications">

<h3>Specifications</h3>

<div className="specGrid">

{
Object.entries(
product.specifications || {}
).map(

([key,value]) => (

<div
key={key}
className="specCard"
>

<h4>{key}</h4>

<p>{value}</p>

</div>

)

)
}

</div>

</div>


<div className="reviewsSection">

<h3>Customer Reviews</h3>

<div className="reviewItem">
★★★★★
<p>Excellent quality product. Highly recommended.</p>
<span>- Amit Kumar</span>
</div>

<div className="reviewItem">
★★★★★
<p>Very durable and easy to install.</p>
<span>- Rahul Singh</span>
</div>

<div className="reviewItem">
★★★★☆
<p>Worth the price and premium finish.</p>
<span>- Priya Sharma</span>
</div>

</div>


<div className="relatedProducts">

<h3>Related Products</h3>

<div className="relatedGrid">

{
products
.filter(item => item.name !== product.name)
.slice(0,3)
.map(item => (

<div
key={item.id}
className="relatedCard"
onClick={() =>
navigate(
`/product/${encodeURIComponent(item.name)}`
)
}
>

<img
src={item.thumbnail}
alt={item.name}
/>

<h4>{item.name}</h4>

<p>₹{item.price}</p>

</div>

))
}

</div>

</div>

</>

)

}

export default ProductDetails;