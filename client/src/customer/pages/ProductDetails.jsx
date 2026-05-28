import React,{useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

import pvc1 from "../assets/products/pvc-pipe/pvc1.jpg";
import pvc2 from "../assets/products/pvc-pipe/pvc2.jpg";
import pvc3 from "../assets/products/pvc-pipe/pvc3.jpg";
import pvc4 from "../assets/products/pvc-pipe/pvc4.jpg";
import pvc5 from "../assets/products/pvc-pipe/pvc5.jpg";

/* WATER PIPE */
import water1 from "../assets/products/water-pipe/water1.jpg";
import water2 from "../assets/products/water-pipe/water2.jpg";
import water3 from "../assets/products/water-pipe/water3.jpg";
import water4 from "../assets/products/water-pipe/water4.jpg";
import water5 from "../assets/products/water-pipe/water5.jpg";

/* SHOWER */
import shower1 from "../assets/products/shower/shower1.jpg";
import shower2 from "../assets/products/shower/shower2.jpg";
import shower3 from "../assets/products/shower/shower3.jpg";
import shower4 from "../assets/products/shower/shower4.jpg";
import shower5 from "../assets/products/shower/shower5.jpg";

/* SINK */
import sink1 from "../assets/products/sink/sink1.jpg";
import sink2 from "../assets/products/sink/sink2.jpg";
import sink3 from "../assets/products/sink/sink3.jpg";
import sink4 from "../assets/products/sink/sink4.jpg";
import sink5 from "../assets/products/sink/sink5.jpg";

/* MOTOR */
import motor1 from "../assets/products/motor/motor1.jpg";
import motor2 from "../assets/products/motor/motor2.jpg";
import motor3 from "../assets/products/motor/motor3.jpg";
import motor4 from "../assets/products/motor/motor4.jpg";
import motor5 from "../assets/products/motor/motor5.jpg";

/* SUBMERSIBLE MOTOR */
import sub1 from "../assets/products/submersible-motor/sub1.jpg";
import sub2 from "../assets/products/submersible-motor/sub2.jpg";
import sub3 from "../assets/products/submersible-motor/sub3.jpg";
import sub4 from "../assets/products/submersible-motor/sub4.jpg";
import sub5 from "../assets/products/submersible-motor/sub5.jpg";

/* PLASTIC TANK */
import tank1 from "../assets/products/plastic-tank/tank1.jpg";
import tank2 from "../assets/products/plastic-tank/tank2.jpg";
import tank3 from "../assets/products/plastic-tank/tank3.jpg";
import tank4 from "../assets/products/plastic-tank/tank4.jpg";
import tank5 from "../assets/products/plastic-tank/tank5.jpg";

/* SINTEX TANK */
import sintex1 from "../assets/products/sintex-tank/sintex1.jpg";
import sintex2 from "../assets/products/sintex-tank/sintex2.jpg";
import sintex3 from "../assets/products/sintex-tank/sintex3.jpg";
import sintex4 from "../assets/products/sintex-tank/sintex4.jpg";
import sintex5 from "../assets/products/sintex-tank/sintex5.jpg";

/* TAP */
import tap1 from "../assets/products/tap/tap1.jpg";
import tap2 from "../assets/products/tap/tap2.jpg";
import tap3 from "../assets/products/tap/tap3.jpg";
import tap4 from "../assets/products/tap/tap4.jpg";
import tap5 from "../assets/products/tap/tap5.jpg";

/* PIPE FITTINGS */
import fitting1 from "../assets/products/pipe-fitting/fitting1.jpg";
import fitting2 from "../assets/products/pipe-fitting/fitting2.jpg";
import fitting3 from "../assets/products/pipe-fitting/fitting3.jpg";
import fitting4 from "../assets/products/pipe-fitting/fitting4.jpg";
import fitting5 from "../assets/products/pipe-fitting/fitting5.jpg";

/* SHOPDISH */
import dish1 from "../assets/products/shopdish/shopdish1.jpg";
import dish2 from "../assets/products/shopdish/shopdish2.jpg";
import dish3 from "../assets/products/shopdish/shopdish3.jpg";
import dish4 from "../assets/products/shopdish/shopdish4.jpg";
import dish5 from "../assets/products/shopdish/shopdish5.jpg";

function ProductDetails({

search,
setSearch,
cart,
setCart

}){

const products={

"PVC Pipe":{
price:999,
images:[pvc1,pvc2,pvc3,pvc4,pvc5],
description:"High quality PVC pipe suitable for water supply.",
features:[
"Leak resistant",
"Strong material",
"Long life",
"Easy installation",
"Premium quality"
]
},

"Water Pipe":{
price:1499,
images:[water1,water2,water3,water4,water5],
description:"Premium water pipe.",
features:[
"Strong material",
"Leak resistant",
"Durable",
"Easy installation",
"Long life"
]
},

"Premium Shower":{
price:4999,
images:[shower1,shower2,shower3,shower4,shower5],
description:"Premium shower system.",
features:[
"Premium quality",
"Water saving",
"Modern finish",
"5 year warranty"
]
},

"Luxury Sink":{
price:2999,
images:[sink1,sink2,sink3,sink4,sink5],
description:"Luxury sink.",
features:[
"Premium ceramic",
"Scratch resistant",
"Elegant finish",
"Easy installation"
]
},

"Water Motor":{
price:5999,
images:[motor1,motor2,motor3,motor4,motor5],
description:"High performance water motor.",
features:[
"Power saving",
"Low noise",
"Strong motor",
"Long life"
]
},

"Submersible Motor":{
price:7999,
images:[sub1,sub2,sub3,sub4,sub5],
description:"Powerful submersible motor.",
features:[
"High power",
"Low electricity use",
"Durable",
"Long life"
]
},

"Plastic Tank":{
price:3499,
images:[tank1,tank2,tank3,tank4,tank5],
description:"Durable plastic tank.",
features:[
"Leak proof",
"Strong body",
"UV protection",
"Long life"
]
},

"Sintex Tank":{
price:6999,
images:[
sintex1,
sintex2,
sintex3,
sintex4,
sintex5
],
description:"Premium Sintex tank.",
features:[
"Leak proof",
"Large capacity",
"Strong body",
"Long life"
]
},

"Modern Tap":{
price:1999,
images:[
tap1,
tap2,
tap3,
tap4,
tap5
],
description:"Premium water tap with modern design.",
features:[
"Rust resistant",
"Smooth flow",
"Premium finish",
"Long life"
]
},

"Pipe Fittings":{
price:799,
images:[
fitting1,
fitting2,
fitting3,
fitting4,
fitting5
],
description:"High quality plumbing fittings.",
features:[
"Leak resistant",
"Durable",
"Easy installation",
"Strong material"
]
},

"Shopdish":{
price:2499,
images:[
dish1,
dish2,
dish3,
dish4,
dish5
],
description:"Premium shop dish.",
features:[
"Elegant design",
"Scratch resistant",
"Easy cleaning",
"Premium quality"
]
}

};

const {name}=useParams();

const navigate=useNavigate();

const product=products[name];

if(!product){

return <h1>Product Not Found</h1>

}

const [selectedImage,setSelectedImage]=
useState(product.images[0]);

const [quantity,setQuantity]=useState(1);

function addToCart(){

const existing=

cart.find(
item=>item.name===name
);

if(existing){

setCart(

cart.map(item=>

item.name===name

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

...cart,

{
name,
price:product.price,
image:selectedImage,
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
alt=""
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
alt=""
/>

</div>

</div>

<div className="rightProduct">

<p className="category">

PREMIUM COLLECTION

</p>

<h1>{name}</h1>

<h2>₹{product.price}</h2>

<p>{product.description}</p>

<div className="featureBox">

<h3>Features</h3>

<ul>

{

product.features.map(

(item,index)=>

<li key={index}>

✓ {item}

</li>

)

}

</ul>

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
onClick={()=>{
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

)

}

export default ProductDetails;