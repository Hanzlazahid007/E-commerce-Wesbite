import React, { useEffect, useState } from "react";
// import data from "./../assets/data.json"
// import data_produc from "./../assets/data";
import Items from "../Items/Items";
import "./Popular.css";

const Popular = () => {
  const [data_produc, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((resp) => resp.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />

      <div className="popular-item">
        {data_produc.map((item, i) => {
          return (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            ></Items>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
