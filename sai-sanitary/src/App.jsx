import React,{useState,useEffect} from "react";
import "./App.css";
import LoginPage from "./LoginPage";

import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import BuyNowPage from "./BuyNowPage";


import NotFoundPage from "./NotFoundPage";
import AboutPage from "./AboutPage";

import ContactPage from "./ContactPage";


import ProfilePage from "./ProfilePage";
import OrdersPage from "./OrdersPage";
import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Products from "./components/Products";
import WhyChoose from "./components/WhyChoose";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

import ProductDetails from "./ProductDetails";
import CategoryPage from "./CategoryPage";

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