import React,{useState} from "react";
import Navbar from "./components/Navbar";
import "./BuyNowPage.css";

import { useLocation } from "react-router-dom";

function BuyNowPage({

cart=[],
setCart,
search,
setSearch

}){

const location = useLocation();

const checkoutItems =
location.state?.items || cart;

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [address,setAddress]=useState("");
const [phone,setPhone]=useState("");

const [payment,setPayment]=
useState("COD");

const [popup,setPopup]=
useState(false);

const [popupMessage,setPopupMessage]=
useState("");

const [success,setSuccess]=
useState(false);



const total=

checkoutItems.reduce(

(total,item)=>

total+(item.price*item.quantity),

0

);
const shipping=99;

const grandTotal=
total+shipping;



function showPopup(

message,
status

){

setPopupMessage(
message
);

setSuccess(
status
);

setPopup(true);

}



function placeOrder(){

if(

!name||
!email||
!address||
!phone

){

showPopup(

"Please fill all details",

false

);

return;

}

if(phone.length!==10){

showPopup(

"Enter valid phone number",

false

);

return;

}


showPopup(
"🎉 Order placed successfully!",
true
);

setCart([]);
localStorage.removeItem("cart");

}



return(

<>

<Navbar

search={search}

setSearch={setSearch}

cart={cart}

/>


{/* CUSTOM POPUP */}

{

popup &&

<div className="popupOverlay">

<div className="popupCard">

<div

className={

success

?

"popupIcon success"

:

"popupIcon error"

}

>

{

success

?

"✓"

:

"!"

}

</div>

<h2>

{

success

?

"Success"

:

"Oops"

}

</h2>

<p>

{popupMessage}

</p>

<button

className="popupBtn"

onClick={()=>
setPopup(false)
}

>

OK

</button>

</div>

</div>

}



<div className="checkoutContainer">

<h1>

Checkout

</h1>

<div className="checkoutGrid">

<div className="shippingCard">

<h2>

Shipping Details

</h2>


<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>
setName(
e.target.value
)
}
className="checkoutInput"
/>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)
}
className="checkoutInput"
/>

<input
type="text"
placeholder="Address"
value={address}
onChange={(e)=>
setAddress(
e.target.value
)
}
className="checkoutInput"
/>

<input
type="text"
placeholder="Phone Number"
value={phone}
maxLength="10"
onChange={(e)=>

setPhone(

e.target.value
.replace(/\D/g,"")

)

}
className="checkoutInput"
/>


<h3>

Payment Method

</h3>

<div className="paymentOptions">

<label>

<input
type="radio"
checked={
payment==="COD"
}
onChange={()=>
setPayment(
"COD"
)
}
/>

Cash On Delivery

</label>


<label>

<input
type="radio"
checked={
payment==="UPI"
}
onChange={()=>
setPayment(
"UPI"
)
}
/>

UPI

</label>


<label>

<input
type="radio"
checked={
payment==="CARD"
}
onChange={()=>
setPayment(
"CARD"
)
}
/>

Card

</label>

</div>


<div className="secureBox">

🔒 Secure Checkout

</div>


<button

className="placeBtn"
onClick={placeOrder}

>

Place Order

</button>

</div>



<div className="summaryCard">

<h2>

Order Summary

</h2>

{

checkoutItems.map((item,index) => {



return (

<div
className="summaryItem"
key={index}
>
<img
  src={
    item.image ||
    item.thumbnail ||
    item.images?.[0]
  }
  alt={item.name}
/>

<div>

<h4>

{item.name}

</h4>

<p>

Qty: {item.quantity}

</p>

</div>

<span>

₹

{item.price*
item.quantity}

</span>

</div>

);

})
}

<hr/>

<div className="priceRow">

<span>

Subtotal

</span>

<span>

₹{total}

</span>

</div>

<div className="priceRow">

<span>

Shipping

</span>

<span>

₹{shipping}

</span>

</div>

<div className="priceRow totalRow">

<span>

Total

</span>

<span>

₹{grandTotal}

</span>

</div>

<div className="deliveryBox">

🚚 Delivery in 2-4 days

</div>

</div>

</div>

</div>

</>

)

}

export default BuyNowPage;