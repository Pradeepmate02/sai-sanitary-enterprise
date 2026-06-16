import React,{useState} from "react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
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

const [mobile,setMobile]=
useState("");

function sendOTP(){

if(mobile.length!==10){

alert(
"Enter valid mobile number"
);

return;

}

alert(
`OTP sent to ${mobile}`
);

}

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

<div
className="mobileBox"
>

<span>

+91

</span>

<input
type="text"
placeholder="Enter Mobile Number"
value={mobile}
maxLength="10"
onChange={(e)=>
setMobile(
e.target.value
.replace(/\D/g,"")
)
}
/>

</div>

<button
className="otpBtn"
onClick={sendOTP}
>

Send OTP

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

<button>

<FaGoogle/>

Google

</button>

</div>

</div>

</div>

</>

)

}

export default LoginPage;