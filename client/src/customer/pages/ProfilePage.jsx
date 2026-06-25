import React from "react";
import Navbar from "../components/Navbar";
import "./ProfilePage.css";
function ProfilePage(){

const user =
JSON.parse(localStorage.getItem("user"));

return(

<>
<Navbar/>

<div className="profileContainer">

<div className="profileCard">

<img
src={user?.photo || "https://via.placeholder.com/150"}
alt=""
className="profileAvatar"
/>

<h1 className="profileName">
{user?.name}
</h1>

<p className="profileEmail">
{user?.email}
</p>

<div className="profileInfo">

<div className="infoBox">
<div className="infoTitle">
Account Type
</div>
<div className="infoValue">
Google User
</div>
</div>

<div className="infoBox">
<div className="infoTitle">
Status
</div>
<div className="infoValue">
Active
</div>
</div>

</div>

</div>

</div>

</>

);

}

export default ProfilePage;