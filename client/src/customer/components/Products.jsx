import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import pvc1 from "../assets/products/pvc-pipe/pvc1.jpg";
import shower1 from "../assets/products/shower/shower1.jpg";
import sink1 from "../assets/products/sink/sink1.jpg";
import tap1 from "../assets/products/tap/tap1.jpg";
import motor1 from "../assets/products/motor/motor1.jpg";
import sintex1 from "../assets/products/sintex-tank/sintex1.jpg";
import tank1 from "../assets/products/plastic-tank/tank1.jpg";
import fitting1 from "../assets/products/pipe-fitting/fitting1.jpg";
import dish1 from "../assets/products/shopdish/shopdish1.jpg";
import water1 from "../assets/products/water-pipe/water1.jpg";
import sub1 from "../assets/products/submersible-motor/sub1.jpg";

const imageMap = {
  "Premium Shower": shower1,
  "Luxury Sink": sink1,
  "Modern Tap": tap1,
  "PVC Pipe": pvc1,
  "CPVC Pipe": pvc1,
  "Water Pipe": water1,
  "Pipe Fittings": fitting1,
  "Water Motor": motor1,
  "Submersible Motor": sub1,
  "Plastic Tank": tank1,
  "Sintex Tank": sintex1,
  "Overhead Shower": shower1,
  "Wall Mixer Tap": tap1,
  "Supreme Water Tank": tank1,
  "Shopdish": dish1
};




function Products({

search,
cart,
setCart,
wishlist,
setWishlist

}){

const navigate=useNavigate();

const [toast,setToast]=useState("");

const [category,setCategory]=
useState("All");

const [priceFilter,setPriceFilter]=
useState("All");

const [showCategory,setShowCategory]=
useState(false);

const [showPrice,setShowPrice]=
useState(false);
const [products, setProducts] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/products")
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);



function showToast(message){

setToast(message);

setTimeout(()=>{

setToast("");

},2000);

}



const filteredProducts=

products.filter((p)=>{

const matchesSearch=

p.name
.toLowerCase()
.includes(
search.toLowerCase()
);

const matchesCategory =
category === "All" ||
p.category?.name === category;
let matchesPrice=true;


if(priceFilter==="Low"){

matchesPrice=
p.price<2500;

}

if(priceFilter==="Medium"){

matchesPrice=
p.price>=2500 &&
p.price<=4000;

}

if(priceFilter==="High"){

matchesPrice=
p.price>4000;

}

return(

matchesSearch &&
matchesCategory &&
matchesPrice

);

});



function addToCart(product){

const existing=

cart.find(
item=>
item.name===product.name
);

if(existing){

setCart(

cart.map(item=>

item.name===product.name

?

{
...item,
quantity:item.quantity+1
}

:

item

)

);

}

else{

setCart([

...cart,

{
...product,
quantity:1
}

]);

}

showToast("🛒 Added to cart");

}



function toggleWishlist(product){

const exists=

wishlist.find(

item=>
item.name===product.name

);

if(exists){

setWishlist(

wishlist.filter(

item=>
item.name!==product.name

)

);

showToast(
"❌ Removed from wishlist"
);

}

else{

setWishlist([

...wishlist,
product

]);

showToast(
"❤️ Added to wishlist"
);

}

}



return(

<section className="products">

{toast &&

<div className="toast">

{toast}

</div>

}

<h2>

Featured Products

</h2>


{/* FILTERS */}

<div
style={{

display:"flex",
justifyContent:"center",
gap:"25px",
marginBottom:"40px"

}}
>


<div style={{position:"relative"}}>

<div

onClick={()=>
setShowCategory(
!showCategory
)
}

style={{

width:"170px",
padding:"15px",
borderBottom:"1px solid #ccc",
display:"flex",
justifyContent:"space-between",
cursor:"pointer",
fontWeight:"600",
background:"white"

}}

>

Category

<span>⌄</span>

</div>


{

showCategory && (

<div

style={{

position:"absolute",
top:"60px",
width:"280px",
background:"white",
padding:"20px",
boxShadow:
"0 5px 20px rgba(0,0,0,.15)",
zIndex:"10"

}}

>


{["All","Shower","Sink","Tap","Pipe","Pipe Fitting","Tank","Motor","Shopdish"]
.map((item)=>(

<p

key={item}

onClick={()=>{

setCategory(item);

setShowCategory(false);

}}

style={{

cursor:"pointer",
padding:"10px"

}}

>

{item}

</p>

))

}

</div>

)

}

</div>


<div style={{position:"relative"}}>

<div

onClick={()=>
setShowPrice(
!showPrice
)
}

style={{

width:"170px",
padding:"15px",
borderBottom:"1px solid #ccc",
display:"flex",
justifyContent:"space-between",
cursor:"pointer",
fontWeight:"600",
background:"white"

}}

>

Price

<span>⌄</span>

</div>


{

showPrice && (

<div

style={{

position:"absolute",
top:"60px",
width:"250px",
background:"white",
padding:"20px",
boxShadow:
"0 5px 20px rgba(0,0,0,.15)",
zIndex:"10"

}}

>

{["All","Low","Medium","High"]

.map((item)=>(

<p

key={item}

onClick={()=>{

setPriceFilter(item);

setShowPrice(false);

}}

style={{

cursor:"pointer",
padding:"10px"

}}

>

{item}

</p>

))

}

</div>

)

}

</div>

</div>


<div className="productGrid">

{
filteredProducts
  .slice(0, 6) // Show only first 6 products
  .map((p, index) => {

const inWishlist =

wishlist.some(
item => item.name === p.name
);

return (

<div
className="productCard"
key={index}
>

<div className="imageContainer">

<img
  src={imageMap[p.name]}
  alt={p.name}
/>

<button

className="wishlistBtn"

onClick={()=>

toggleWishlist(p)

}

>

{

inWishlist

?

"❤️"

:

"🤍"

}

</button>


<button

className="viewBtn"

onClick={()=>
navigate(
`/product/${p.name}`
)
}

>

View Details

</button>

</div>


<p className="productType">

PREMIUM COLLECTION

</p>

<h3>

{p.name}

</h3>

<div className="priceSection">

<h4>

₹{p.price}

</h4>

<span>

30% off

</span>

</div>


<button
className="btn"
onClick={()=>
addToCart(p)
}
>

Add To Cart

</button>

</div>

)

})

}

</div>

</section>

)

}

export default Products;