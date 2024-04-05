import React, { useState } from "react";
import "./AddProduct.css";
import upload_area_icon from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProduct] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const changeHandler = (e) => {
    setProduct({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const addProduct = async (e) => {
    const product = productDetails; // Assuming you have productDetails defined somewhere

    const formData = new FormData();
    formData.append("product", image);

    const uploadResponse = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
    // console.log(uploadResponse);

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const uploadData = await uploadResponse.json();
    // console.log(uploadData);
    if (uploadData.success) {
      product.image = uploadData.imageUrl; // Adjusted to match the response field name
      console.log(product);

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) =>
          data.success ? alert("Product Added") : alert("Failed")
        );

      // let product = productDetails;
      // console.log(product);

      // let responceData;
      // let formdata = new FormData();
      // formdata.append("product", image);

      // console.log(formdata);
      // await fetch("http://localhost:4000/upload", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //   },
      //   body: formdata,
      // })
      //   .then((resp) => resp.json())
      //   .then((data) => {
      //     responceData = data;
      //   });

      // if (responceData.success) {
      //   product.image = responceData.image_url;
      //   console.log(product);
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area_icon}
            alt=""
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={() => addProduct()} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
