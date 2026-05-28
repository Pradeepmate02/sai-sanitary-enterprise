import React from "react";
import {useParams,useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* PRODUCT IMAGES */

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


function CategoryPage({

search,
setSearch,
cart,
setCart,
wishlist=[],
setWishlist

}){

const navigate=useNavigate();

const {category}=useParams();

const categoryProducts={

pipes:[

{
name:"PVC Pipe",
price:999,
rating:4.5,
image:pvc1
},

{
name:"Water Pipe",
price:1499,
rating:4.7,
image:water1
},

{
name:"Pipe Fittings",
price:799,
rating:4.5,
image:fitting1
}

],

bathroom:[

{
name:"Premium Shower",
price:4999,
rating:4.8,
image:shower1
},

{
name:"Modern Tap",
price:1999,
rating:4.7,
image:tap1
},

{
name:"Shopdish",
price:2499,
rating:4.6,
image:dish1
}

],

kitchen:[

{
name:"Luxury Sink",
price:2999,
rating:4.6,
image:sink1
},

{
name:"Modern Tap",
price:1999,
rating:4.7,
image:tap1
}

],

motors:[

{
name:"Water Motor",
price:5999,
rating:4.9,
image:motor1
},

{
name:"Submersible Motor",
price:7999,
rating:4.7,
image:sub1
}

],

"water-tanks":[

{
name:"Plastic Tank",
price:3499,
rating:4.5,
image:tank1
},

{
name:"Sintex Tank",
price:6999,
rating:4.8,
image:sintex1
}

]

};

/* SEARCH FILTER */

const filteredProducts=

categoryProducts[category]?.filter(

(item)=>

item.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);


function addToCart(product){

const existing=

cart.find(
item=>item.name===product.name
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

}


function toggleWishlist(product){

const exists=

wishlist.find(
item=>item.name===product.name
);

if(exists){

setWishlist(

wishlist.filter(
item=>item.name!==product.name
)

);

}

else{

setWishlist([

...wishlist,
product

]);

}

}


return(

<>

<Navbar

search={search}
setSearch={setSearch}
cart={cart}
wishlist={wishlist}

/>


<div className="categoryPage">

<h1>{category}</h1>

<div className="categoryProducts">

{

filteredProducts?.length>0

?

(

filteredProducts.map(

(item,index)=>{

const inWishlist=

wishlist.some(
p=>p.name===item.name
);

return(

<div
className="categoryCard"
key={index}
>

<button
className="wishlistBtn"
onClick={()=>
toggleWishlist(item)
}
>

{inWishlist ? "❤️":"🤍"}

</button>

<img
src={item.image}
alt={item.name}
/>

<h3>

{item.name}

</h3>

<p>

{"⭐".repeat(
Math.floor(item.rating)
)}

({item.rating})

</p>

<p>

₹{item.price}

</p>

<div

style={{

display:"flex",
flexDirection:"column",
gap:"15px"

}}

>

<button

className="viewDetailsBtn"

onClick={()=>

navigate(
`/product/${item.name}`
)

}

>

View Details

</button>

<button

onClick={()=>
addToCart(item)
}

>

Add To Cart

</button>

</div>

</div>

)

})

)

:

(

<h2>

No products found 🔍

</h2>

)

}

</div>

</div>

<Footer/>

</>

)

}

export default CategoryPage;