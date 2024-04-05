// import { React, useContext } from "react";
// import { shopContext } from "./../components/context/ShopContext";
// import { useParams } from "react-router-dom";
// import Breadcrum from "../components/BreadCrum/Breadcrum";
// import ProductDisplay from "../components/ProductDsiplay/ProductDisplay";
import React, { useContext } from "react";
import { shopContext } from "../components/context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/BreadCrum/Breadcrum";
import ProductDisplay from "../components/ProductDsiplay/ProductDisplay";
import Desciptionbox from "../components/Descriptionbox/Desciptionbox";
import RelatedProduct from "../components/RelatedProduct/RelatedProduct";

const Product = () => {
  const { all_products } = useContext(shopContext);

  const { productId } = useParams();

  const product = all_products.find((e) => e.id === Number(productId));
  // console.log(product);
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <Desciptionbox />
      <RelatedProduct />
    </div>
  );
};

export default Product;
