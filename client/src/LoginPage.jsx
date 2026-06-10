import React,{useState} from "react";
import Navbar from "./components/Navbar";
import "./LoginPage.css";


import {
FaFacebook,
FaGoogle
}
from "react-icons/fa";

function LoginPage({

search,
setSearch,
cart=[]

}){






return(

<>

<Navbar
search={search}
setSearch={setSearch}
cart={cart}
/>

<div
className="loginContainer"
>

<div
className="loginCard"
>

<h2>

Login or Signup

</h2>

<input
type="email"
placeholder="Enter Email"
className="loginInput"
/>

<input
type="password"
placeholder="Enter Password"
className="loginInput"
/>

<button
className="otpBtn"
>
Login
</button>


<div
className="divider"
>

<span>

or login with

</span>

</div>

<div
className="socialBtns"
>

<button>

<FaFacebook/>

Facebook

</button>
<button disabled>

<FaGoogle/>

Google (Coming Soon)

</button>
</div>

</div>

</div>

</>

)

}

export default LoginPage;