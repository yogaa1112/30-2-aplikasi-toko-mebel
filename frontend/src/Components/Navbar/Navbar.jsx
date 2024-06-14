import React, { useState, useEffect } from "react";
import axios from "axios";
import './Navbar.css'
import logo from '../Assets/logo-text.png'
import cart_icon from '../Assets/cart_icon.png'
import search_icon from '../Assets/search_icon.png'
import people_icon from '../Assets/people_icon.png'
import logout_icon from '../Assets/logout.png'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();


    const searchHandler = async ()=>{
        try {
            const response = await axios.get(`http://localhost:4000/search?query=${searchQuery}`);
            setSearchResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.nav-search') && !event.target.closest('.search-results')) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleResultClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const [menu, setMenu] = useState("shop");

    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to='/'><img src={logo} alt="logo" /></Link>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("home") }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/home'>Home</Link>
                    {menu === "home" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("office") }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/office'>Office</Link>
                    {menu === "office" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("kitchen") }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/kitchen'>Kitchen</Link>
                    {menu === "kitchen" ? <hr /> : null}
                </li>
            </ul>
            <div className="nav-search-login-cart">
                <div className="nav-search">
                    <input  type="text" 
                        placeholder="Cari..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                         />
                    <Link to=''><img onClick={searchHandler} src={search_icon} alt="search" id="search_icon" /></Link>
                </div>
                {localStorage.getItem('auth-token')
                    ? <Link onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/") }}>
                        <img src={logout_icon} alt="logout" id="logout-icon" />
                      </Link>
                    : <Link to='/login'><img src={people_icon} alt="login" id="login-icon" /></Link>
                }  
                <Link to='/cart'><img src={cart_icon} alt="cart" id="cart-icon" /></Link>
            </div>
            {showResults && searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map(result => (
                        <div className="search-results-item" onClick={() => handleResultClick(result.id)}key={result.id}>
                            <h3>{result.name}</h3>
                            <p>{result.category} - {result.sub_category}</p>
                            <img src={result.image} alt="" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Navbar;
