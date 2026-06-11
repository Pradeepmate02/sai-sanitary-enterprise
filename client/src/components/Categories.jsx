import React from "react";
import {useNavigate} from "react-router-dom";

function Categories(){

const navigate=useNavigate();

const items=[

{
name:"Pipes",
route:"pipes"
},

{
name:"Bathroom",
route:"bathroom"
},

{
name:"Motors",
route:"motors"
},

{
name:"Water Tanks",
route:"water-tanks"
}

];

return(

<section className="categories">

<h2>Shop By Category</h2>

<div className="catGrid">

{

items.map((item,index)=>(

<div
className="card"
key={index}
onClick={()=>
navigate(
`/category/${item.route}`
)
}
>

<h3>{item.name}</h3>

</div>

))

}

</div>

</section>

)

}

export default Categories;