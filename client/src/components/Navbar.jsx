import React,{useState} from "react";
import "./Navbar.css";

import {
FaShoppingCart,
FaSearch,
FaHeart,
FaBars,
FaTimes,
FaUserCircle,
FaSignOutAlt,
FaUser,
FaBoxOpen,
FaChevronDown
}
from "react-icons/fa";

import {useNavigate} from "react-router-dom";

import logo from "../assets/SAI-SANETRY.jpeg";

function Navbar({

search="",
setSearch=()=>{},
cart=[],
wishlist=[]

}){

const navigate=useNavigate();

const [menuOpen,setMenuOpen]=
useState(false);

const [profileOpen,setProfileOpen]=
useState(false);

const user=
JSON.parse(
localStorage.getItem("user")
);

function logout(){

localStorage.removeItem("user");

window.location.href="/";

}

return(

<nav className="navbar">

<div
className="logo"
onClick={()=>navigate("/")}
>

<img
src={logo}
alt="Sai Sanitary"
/>

<div className="logoText">
SAI SANITARY
</div>

</div>

<div
className="menuIcon"
onClick={()=>
setMenuOpen(!menuOpen)
}
>

{
menuOpen
?
<FaTimes/>
:
<FaBars/>
}

</div>

<ul
className={
menuOpen
?
"navLinks active"
:
"navLinks"
}
>

<li onClick={()=>navigate("/")}>
Home
</li>

<li onClick={()=>navigate("/category/pipes")}>
Pipes
</li>

<li onClick={()=>navigate("/category/bathroom")}>
Bathroom
</li>

<li onClick={()=>navigate("/category/kitchen")}>
Kitchen
</li>

<li onClick={()=>navigate("/category/motors")}>
Motors
</li>

<li onClick={()=>navigate("/category/water-tanks")}>
Water Tanks
</li>

</ul>

<div className="navRight">

<div className="searchBox">

<FaSearch/>

<input
type="text"
placeholder="Search Products"
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

</div>

<div
className="cartBox"
onClick={()=>
navigate("/wishlist")
}
>

<FaHeart/>

<span>
{wishlist.length}
</span>

</div>

<div
className="cartBox"
onClick={()=>
navigate("/cart")
}
>

<FaShoppingCart/>

<span>
{cart.length}
</span>

</div>

{
user ? (

<div className="profileWrapper">

<div
className="loginBtn"
onClick={()=>
setProfileOpen(!profileOpen)
}
>

<img
src={user.photo}
alt=""
style={{
width:"30px",
height:"30px",
borderRadius:"50%"
}}
/>

<span>
{user.name}
</span>

<FaChevronDown/>

</div>

{
profileOpen && (

<div className="profileDropdown">

<div
className="profileItem"
onClick={()=>
navigate("/profile")
}
>

<FaUser/>
My Profile

</div>

<div
className="profileItem"
onClick={()=>
navigate("/orders")
}
>

<FaBoxOpen/>
My Orders

</div>

<div
className="profileItem logoutItem"
onClick={logout}
>

<FaSignOutAlt/>
Logout

</div>

</div>

)

}

</div>

) : (

<button
className="loginBtn"
onClick={()=>
navigate("/login")
}
>

<FaUserCircle/>
Login

</button>

)
}

</div>
</nav>

);

}

export default Navbar;