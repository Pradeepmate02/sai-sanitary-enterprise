import React from "react";

function Testimonials(){

const reviews=[

{
name:"Rahul Sharma",
text:"Excellent quality products and fast delivery."
},

{
name:"Priya Patel",
text:"Bathroom accessories look premium and modern."
},

{
name:"Amit Verma",
text:"Very satisfied with Shree Sai products."
}

];

return(

<section className="testimonials">

<h2>Customer Reviews</h2>

<div className="reviewGrid">

{reviews.map((r,index)=>(

<div className="reviewCard" key={index}>

<h3>{r.name}</h3>

<p>{r.text}</p>

⭐⭐⭐⭐⭐

</div>

))}

</div>

</section>

)

}

export default Testimonials;