import React from "react";
import Navbar from "./components/Navbar";
import "./OrdersPage.css";
import { useNavigate } from "react-router-dom";

function OrdersPage(){

const navigate = useNavigate();

return(

<>
<Navbar/>

<div className="ordersContainer">

<h1 className="ordersTitle">
My Orders
</h1>

<div className="emptyOrders">

<h2>
📦 No Orders Yet
</h2>

<p>
Looks like you haven't placed any orders yet.
Explore our premium sanitary products and place your first order today.
</p>
<button
className="shopBtn"
onClick={() => navigate("/")}
>
Start Shopping
</button>

</div>

</div>

</>

);

}

export default OrdersPage;