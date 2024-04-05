import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "./../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProduct, setAllproduct] = useState([]);

  const fetchInfo = async () => {
    const responce = await fetch("http://localhost:4000/allproducts");
    const data = await responce.json();
    setAllproduct(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []); //componentDidMount

  const removeProduct = async (id) => {
    const responce = await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    // await fetchInfo();
  };
  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProduct.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format listproduct-format-main"
              >
                <img className="listproduct-format-icon" src={item.image} />
                <p>{item.name}</p>
                <p>${item.old_price}</p>
                <p>${item.new_price}</p>
                <p>{item.category}</p>
                <img
                  className="listproduct-remove-icon"
                  onClick={removeProduct(item.id)}
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
