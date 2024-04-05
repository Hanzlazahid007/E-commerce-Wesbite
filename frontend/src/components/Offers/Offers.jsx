import React from "react";
import exclusice from "./../assets/exclusive_image.png";
import "./Offers.css";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY ON BEST SELLER PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusice} alt="" />
      </div>
    </div>
  );
};

export default Offers;
