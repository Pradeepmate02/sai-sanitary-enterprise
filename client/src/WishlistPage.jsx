import React from "react";
import Navbar from "./components/Navbar";
import {useNavigate} from "react-router-dom";
import {FaHeartBroken} from "react-icons/fa";
import "./WishListPage.css";

function WishlistPage({

wishlist=[],
setWishlist,
search,
setSearch,
cart=[],
setCart

}){

const navigate=useNavigate();

function removeItem(name){

setWishlist(

wishlist.filter(
item=>item.name!==name
)

);

}

function moveToCart(product){

const existing=

cart.find(
item=>item.name===product.name
);

if(existing){

setCart(

cart.map(item=>

item.name===product.name

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

else{

setCart([

...cart,

{
...product,
quantity:1
}

]);

}

setWishlist(

wishlist.filter(
item=>item.name!==product.name
)

);

}


return(

<>

<Navbar
search={search}
setSearch={setSearch}
cart={cart}
wishlist={wishlist}
/>


<div className="wishlistContainer">

<h1>

My Wishlist ❤️

</h1>


{

wishlist.length===0

?

(

<div className="emptyWishlist">

<div className="emptyIcon">

<FaHeartBroken/>

</div>

<h2>

Your Wishlist is Empty

</h2>

<p>

Save products you love and view them here later

</p>

<button

className="shopBtnWishlist"

onClick={()=>navigate("/")}

>

Continue Shopping

</button>

</div>

)

:

(

<div className="wishlistGrid">

{

wishlist.map((item,index) => {

console.log(item);
console.log(item.name, item.image);

return (

<div
className="wishlistCard"
key={index}
>
<img
  src={
    item.image ||
    item.thumbnail ||
    item.images?.[0]
  }
  alt={item.name}
  onClick={() =>
    navigate(`/product/${item.name}`)
  }
/>

<div className="wishlistCardContent">

<h3>{item.name}</h3>

<p>₹{item.price}</p>

<div className="wishlistButtons">

<button
onClick={()=>
moveToCart(item)
}
>
🛒 Move To Cart
</button>

<button
onClick={()=>
removeItem(item.name)
}
>
🗑 Remove
</button>

</div>

</div>

</div>

);

})
}

</div>

)

}

</div>

</>

)

}

export default WishlistPage;