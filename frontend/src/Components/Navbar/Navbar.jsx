import React, { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import search_icon from '../Assets/search_icon.png'
import { Link } from "react-router-dom";

const Navbar = () => {

    const [menu, setMenu] = useState("home");
    return (
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
                <li onClick={() => { setMenu("home") }}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("office") }}><Link style={{ textDecoration: 'none' }} to='/office'>Office</Link>{menu === "office" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kitchen") }}><Link style={{ textDecoration: 'none' }} to='/kitchen'>Kitchen</Link>{menu === "kitchen" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("living") }}><Link style={{ textDecoration: 'none' }} to='/living'>Living</Link>{menu === "living" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}

export default Navbar
