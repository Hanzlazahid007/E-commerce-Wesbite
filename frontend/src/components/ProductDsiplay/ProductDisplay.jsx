import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "./../assets/star_icon.png";
import star_dull_icon from "./../assets/star_dull_icon.png";
import { shopContext } from "../context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addTocart } = useContext(shopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="product-display-right-prices">
          <div className="product-display-right-prices-old">
            ${product.old_price}
          </div>
          <div className="product-display-right-prices-new">
            ${product.new_price}
          </div>
        </div>
        <div className="product-display-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          necessitatibus ea omnis dolore cum saepe dolores sapiente tenetur ad
          molestiae?
        </div>
        <div className="product-display-right-size">
          <h1>Select size</h1>
          <div className="product-display-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addTocart(product.id)}>Add to cart</button>
        <p className="productdisplay-right-category">
          <span>Category : </span> Women, t-shirt, Crop Down
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span> modern , Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
