import { React, useContext } from "react";
import { shopContext } from "./../components/context/ShopContext";
import "./CSS/ShopCategory.css";
import dropDown_icon from "./../components/assets/dropdown_icon.png";
import Items from "../components/Items/Items";

const ShopCategory = (props) => {
  const { all_products } = useContext(shopContext);
  // console.log(all_products);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt=" " />
      <div className="shopcategory-indexSort">
        <p>
          <span>Shwoing 1-12</span> out of 36 products
        </p>
        <div className="shop-category-sort">
          Sort by <img src={dropDown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products.map((item, i) => {
          if (item.category === props.category) {
            return (
              <div className="gap">
                <Items
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore more</div>
    </div>
  );
};

export default ShopCategory;
