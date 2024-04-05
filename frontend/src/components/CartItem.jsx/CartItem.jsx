import React, { useContext } from "react";
import "./CartItem.css";
import { shopContext } from "../context/ShopContext";
import remove_ico from "./../assets/cart_cross_icon.png";

const CartItem = () => {
  const { all_products, cartItem, removeTocart, getTotalCartAmout } =
    useContext(shopContext);
  console.log(cartItem);
  return (
    <div className="CartItem">
      <div className="CartItem-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="CartItem-format-main CartItem-format">
                <img src={e.image} alt="" className="CartItem-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{cartItem[e.id]}</button>
                <p>${e.new_price * cartItem[e.id]}</p>
                <img
                  src={remove_ico}
                  className="remove"
                  onClick={() => removeTocart(e.id)}
                  alt=""
                />
              </div>
              <hr></hr>
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>${getTotalCartAmout()}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Total</p>
            <p>${getTotalCartAmout()}</p>
          </div>
          <button>PROCEES TO CHECKOUT</button>
        </div>
      </div>
      <div className="cartitems-promocode">
        <p>If you have a promo code , Enter it here</p>
        <div className="cartitems-promobox">
          <input type="text" placeholder="promo code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
