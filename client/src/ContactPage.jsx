import React from "react";
import "./ContactPage.css";

function ContactPage(){

return(

<div className="contactContainer">

<h1>Contact Us</h1>

<p className="contactSubtitle">
We would love to hear from you.
Send us your questions and feedback.
</p>

<div className="contactCard">

<div className="contactInfo">

<h2>Get In Touch</h2>

<p>📍 Sai Sanitary, Sangli, Maharashtra</p>

<p>📞 +91 9876543210</p>

<p>📧 support@saisanitary.com</p>

<p>🕒 Mon - Sat : 9:00 AM - 8:00 PM</p>

</div>

<form className="contactForm">

<input
type="text"
placeholder="Your Name"
/>

<input
type="email"
placeholder="Your Email"
/>

<input
type="text"
placeholder="Subject"
/>

<textarea
rows="5"
placeholder="Your Message"
/>

<button type="submit">

Send Message

</button>

</form>

</div>

</div>

);

}

export default ContactPage;