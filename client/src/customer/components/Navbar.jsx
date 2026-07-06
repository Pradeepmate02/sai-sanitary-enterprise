import React,{useState} from "react";
import "./Navbar.css";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
FaShoppingCart,
FaSearch,
FaHeart,
FaBars,
FaTimes,
FaUserCircle
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
const user = JSON.parse(localStorage.getItem("user"));

const logout = () => {
  Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0f766e",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 600);
    }
  });
};

const [menuOpen,setMenuOpen]=
useState(false);

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

<span>SAI SANITARY</span>

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

{
user ? (
  <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

    <span>
      Hello, {user.name}
    </span>

    <button
      className="loginBtn"
      onClick={logout}
    >
      Logout
    </button>

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
<span>{wishlist.length}</span>

</div>

<div
className="cartBox"
onClick={()=>
navigate("/cart")
}
>

<FaShoppingCart/>
<span>{cart.length}</span>

</div>

</div>

</nav>

)

}

export default Navbar;