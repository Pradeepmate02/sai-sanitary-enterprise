import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

import products from "../products";

import "./Products.css";

function Products({

search,
cart,
setCart,
wishlist,
setWishlist

}){


    const navigate=useNavigate();

const [toast,setToast]=useState("");
const [toastType,setToastType]=useState("success");

const [category,setCategory]=
useState("All");

const [priceFilter,setPriceFilter]=
useState("All");

const [showCategory,setShowCategory]=
useState(false);

const [showPrice,setShowPrice]=
useState(false);







function showToast(message,type="success"){

setToast(message);
setToastType(type);

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

category === "All"
||
p.category === category.toLowerCase().replace(" ", "-");

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

<div className={`toast ${toastType}`}>

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


{[
  "All",
  "Pipes",
  "Bathroom",
  "Kitchen",
  "Motors",
  "Water Tanks"
]
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

console.log("Selected Price:", item);

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

filteredProducts.slice(0,5).map((p,index)=>{

const inWishlist=

wishlist.some(

item=>
item.name===p.name

);

return(

<div
className="productCard"
key={index}
>

<div className="imageContainer">

<img
src={p.images[0]}
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