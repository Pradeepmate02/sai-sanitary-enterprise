import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {

const navigate = useNavigate();

return (

<div className="notFoundContainer">

<h1>404</h1>

<h2>Page Not Found</h2>

<p>
Oops! The page you are looking for does not exist.
</p>

<button
onClick={() => navigate("/")}
>
Go To Home
</button>

</div>

);

}

export default NotFoundPage;