import React from "react";

function Hero(){

function handleExplore(){

document.querySelector(".products")
.scrollIntoView({
behavior:"smooth"
})

}

return(

<section className="hero">

<div className="heroOverlay"></div>

<div className="heroContent">

<div className="leftHero">

<p className="smallTitle">

LIMITED OFFERS

</p>

<h1>

Sai Sanitary Products Store

</h1>

<p>

Quality sanitary products including
taps, showers, sinks, motors,
water tanks, pipes and fittings.

All products available with trusted
quality and affordable pricing.

</p>

<div className="heroBtns">

<button
className="exploreBtn"
onClick={handleExplore}
>

Explore Products

</button>

</div>

<div className="stats">

<div>

<h2>500+</h2>

<span>Products</span>

</div>

<div>

<h2>100%</h2>

<span>In Stock</span>

</div>

<div>

<h2>24/7</h2>

<span>Support</span>

</div>

</div>

</div>

<div className="rightHero">

<img
src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000"
alt=""
/>

</div>

</div>

</section>

)

}

export default Hero;