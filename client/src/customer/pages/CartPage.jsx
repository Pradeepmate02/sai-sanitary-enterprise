import React from "react";
import "./CartPage.css";

import {useNavigate}
from "react-router-dom";

import Navbar from "../components/Navbar";

function CartPage({

cart,
setCart,
search,
setSearch

}){

const navigate=
useNavigate();


function increase(name){

setCart(

cart.map(item=>

item.name===name

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


function decrease(name){

setCart(

cart.map(item=>

item.name===name

?

{
...item,
quantity:item.quantity-1
}

:

item

)

.filter(
item=>item.quantity>0
)

);

}


function remove(name){

setCart(

cart.filter(

item=>

item.name!==name

)

);

}


const total=

cart.reduce(

(sum,item)=>

sum+(item.price*item.quantity),

0

);


return(

<>

<Navbar
search={search}
setSearch={setSearch}
cart={cart}
setCart={setCart}
/>

<div className="cartPage">

<h1>

🛒 Shopping Cart

</h1>


{

cart.length===0

?

<div
style={{

display:"flex",
justifyContent:"center",
alignItems:"center",
marginTop:"60px"

}}
>

<div
style={{

background:"white",
padding:"50px",
borderRadius:"30px",
width:"500px",
textAlign:"center",

boxShadow:
"0 15px 40px rgba(0,0,0,.08)"

}}
>

<img

src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"

alt="Empty Cart"

style={{

width:"220px",
marginBottom:"25px"

}}

/>

<h2
style={{

fontSize:"42px",
marginBottom:"15px",
color:"#1f2937"

}}
>

Your Cart Is Empty

</h2>

<p
style={{

fontSize:"18px",
color:"#6b7280",
lineHeight:"1.7",
marginBottom:"30px"

}}
>

Looks like you haven't added any products yet.

Start exploring premium collections.

</p>


<button
className="btn"

onClick={()=>
navigate("/")
}

>

Continue Shopping

</button>

</div>

</div>

:

<>

{

cart.map(

(item,index)=>(

<div

className="cartCard"

key={index}

style={{

cursor:"pointer"

}}

onClick={()=>

navigate(

`/product/${item.name}`

)

}

>

<img

src={item.image}

alt={item.name}

/>

<div>

<h2>

{item.name}

</h2>

<h3>

₹{item.price}

</h3>

<p>

Qty : {item.quantity}

</p>

<div className="cartButtons">

<button
onClick={(e)=>{

e.stopPropagation();

increase(item.name);

}}
>

+

</button>

<button
onClick={(e)=>{

e.stopPropagation();

decrease(item.name);

}}
>

-

</button>

<button
onClick={(e)=>{

e.stopPropagation();

remove(item.name);

}}
>

❌


</button>
<button
onClick={(e)=>{

e.stopPropagation();

navigate("/buy");

}}
>

Buy Now

</button>

</div>

</div>

</div>

)

)

}

<h1>

Total: ₹{total}

</h1>

</>

}

</div>

</>

)

}

export default CartPage;