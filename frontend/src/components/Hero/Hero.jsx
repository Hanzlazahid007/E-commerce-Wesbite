import React from "react";
import "./Hero.css";
import handIcon from "./../assets/hand_icon.png";
import arrowIcon from "./../assets/arrow.png";
import hero from "./../assets/product_36.png";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New ARRIVAL ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={handIcon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrowIcon} alt=" " />
        </div>
      </div>
      <div className="hero-right">
        <img className="her" src={hero} alt="" />
      </div>
    </div>
  );
};

export default Hero;
