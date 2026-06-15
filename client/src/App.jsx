import React,{useState,useEffect} from "react";
import "./App.css";
import LoginPage from "./customer/pages/LoginPage";

import CartPage from "./customer/pages/CartPage";
import WishlistPage from "./customer/pages/WishlistPage";
import BuyNowPage from "./customer/pages/BuyNowPage";

import AboutPage from "./customer/pages/AboutPage";

import ContactPage from "./customer/pages/ContactPage";

import ProfilePage from "./ProfilePage";
import OrdersPage from "./OrdersPage";
import NotFoundPage from "./NotFoundPage";
import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Hero from "./customer/components/Hero";
import Navbar from "./customer/components/Navbar";
import Categories from "./customer/components/Categories";
import Products from "./customer/components/Products";
import WhyChoose from "./customer/components/WhyChoose";
import Testimonials from "./customer/components/Testimonials";
import Newsletter from "./customer/components/Newsletter";
import Footer from "./customer/components/Footer";

import ProductDetails from "./customer/pages/ProductDetails";
import CategoryPage from "./customer/pages/CategoryPage";
function Home({

search,
setSearch,
cart,
setCart,
wishlist,
setWishlist

}){

return(

<>
<Navbar
search={search}
setSearch={setSearch}
cart={cart}
setCart={setCart}
wishlist={wishlist}
/>
<Hero/>

<Categories/>

<Products
search={search}
cart={cart}
setCart={setCart}
wishlist={wishlist}
setWishlist={setWishlist}
/>

<WhyChoose/>
<Testimonials/>
<Newsletter/>
<Footer/>

</>

)

}

function App(){

const [search,setSearch]=
useState("");


// CART

const [cart,setCart]=
useState(()=>{

const savedCart=
localStorage.getItem("cart");

return savedCart ?

JSON.parse(savedCart)

:

[];

});


// WISHLIST

const [wishlist,setWishlist]=
useState(()=>{

const savedWishlist=

localStorage.getItem(
"wishlist"
);

return savedWishlist ?

JSON.parse(savedWishlist)

:

[];

});




// SAVE CART

useEffect(()=>{

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

},[cart]);




// SAVE WISHLIST

useEffect(()=>{

localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);

},[wishlist]);



return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={

<Home
search={search}
setSearch={setSearch}
cart={cart}
setCart={setCart}
wishlist={wishlist}
setWishlist={setWishlist}
/>

}
/>

<Route
path="/product/:name"
element={

<ProductDetails
search={search}
setSearch={setSearch}
cart={cart}
setCart={setCart}
wishlist={wishlist}
/>

}
/>

<Route
path="/category/:category"
element={

<CategoryPage
search={search}
setSearch={setSearch}
cart={cart}
setCart={setCart}
wishlist={wishlist}
setWishlist={setWishlist}
/>

}
/>

<Route
path="/cart"
element={

<CartPage
cart={cart}
setCart={setCart}
search={search}
setSearch={setSearch}
wishlist={wishlist}
/>

}
/>
<Route
path="/wishlist"
element={

<WishlistPage
wishlist={wishlist}
setWishlist={setWishlist}
search={search}
setSearch={setSearch}
cart={cart}
setCart={setCart}
/>


}

/>
<Route
path="/buy"
element={
<BuyNowPage
cart={cart}
setCart={setCart}
search={search}
setSearch={setSearch}
/>
}
/>
<Route
path="/login"
element={
<LoginPage
search={search}
setSearch={setSearch}
cart={cart}
/>
}
/>


<Route
path="/profile"
element={<ProfilePage />}
/>

<Route
path="/orders"
element={<OrdersPage />}
/>

<Route
path="*"
element={<NotFoundPage />}
/>

<Route
path="/about"
element={<AboutPage/>}
/>
<Route
path="/contact"
element={<ContactPage/>}
/>

</Routes>

</BrowserRouter>

)

}

export default App;