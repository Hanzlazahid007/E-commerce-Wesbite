import React, { useRef, useState } from "react";
// import logo from "../assets/logo.png";
import footer_logo from "./../assets/logo_big.png";

import cart_icon from "../assets/cart_icon.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import drop_icon from "./../assets/chevron.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItem } = useContext(shopContext);
  const menuRef = useRef();
  const dropDown = (e) => {
    menuRef.current.classList.toggle("visible");
    e.target.classList.toggle("open");
  };

  const change = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <image src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-drop-down"
        onClick={dropDown}
        src={drop_icon}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: "none" }} to={"/mens"}>
            MEN{" "}
          </Link>{" "}
          {menu === "mens" ? <hr /> : <></>}{" "}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: "none" }} to={"/womens"}>
            Women
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}{" "}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to={"/kids"}>
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}{" "}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button onClick={change}>Log Out</button>
        ) : (
          <Link to={"/login"}>
            <button>Login</button>{" "}
          </Link>
        )}
        <Link to={"/cart"}>
          {" "}
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
