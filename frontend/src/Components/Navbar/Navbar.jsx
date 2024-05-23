import React, { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import search_icon from '../Assets/search_icon.png'

const Navbar = () => {

    const [menu,setMenu] = useState("home");
    return(
        <div className="navbar">
          <div className="nav-logo">
            <img src={logo} alt="logo" />
            <p>Mebelify</p>    
          </div>
          <div className="nav-search">
              <input type="text" placeholder="Cari..." />
              <img src={search_icon} alt="search" />
          </div>
          <ul className="nav-menu">
              <li onClick={()=>{setMenu("home")}}>Home{menu==="home"?<hr />:<></>}</li>
              <li onClick={()=>{setMenu("office")}}>Office{menu==="office"?<hr />:<></>}</li>
              <li onClick={()=>{setMenu("school")}}>School{menu==="school"?<hr />:<></>}</li>
          </ul>
           <div className="nav-login-cart">
                <button>Login</button>
                <img src={cart_icon} alt="cart" />
           </div>             
        </div>
    )
}

export default Navbar
