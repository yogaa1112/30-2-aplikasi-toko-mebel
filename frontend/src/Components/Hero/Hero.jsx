import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-hand-icon">
          <p>NEW</p>
        </div>
        <p>COLLECTIONS</p>
        <p>FOR EVERYONE</p>
      </div>
      <div className="hero-latest-btn">
        <div>Latest Collections</div>
        <img src={arrow_icon} alt="" />
      </div>
      <div className="hero-right"></div>
      <img src={hero_image} alt="" />
    </div>
  );
};

export default Hero;
