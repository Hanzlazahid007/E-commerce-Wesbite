import { React, createContext, useEffect, useState } from "react";
// import all_products from "./../assets/all_product";

export const shopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());
  const [all_products, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => setProduct(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "content-type": "application/json",
        },
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => setCartItem(data));
    }
  }, []);

  // const addTocart = (itemId) => {
  //   setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http:localhost:4000/addtocart", {
  //       method: "POST",
  //       headers: {
  //         Aceept: "application/json",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ "itemId ": itemId }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => console.log(data));
  //   }
  // };

  // const addTocart = (itemId) => {
  //   setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

  //     if (localStorage.getItem("auth-token")) {
  //       fetch("http://localhost:4000/addtocart", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "auth-token": localStorage.getItem("auth-token"),
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ itemId: itemId }),
  //       })
  //         .then((resp) => resp.json())
  //         .then((data) => console.log(data))
  //         .catch((error) => console.error("Error:", error));
  //     }
  // };

  const addTocart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => {
          if (resp.ok) {
            console.log("Item added successfully");
          } else {
            throw new Error("Failed to add item to cart");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const getTotalCartItem = () => {
    let totalIem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalIem += cartItem[item];
      }
    }
    return totalIem;
  };

  const removeTocart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => {
          if (resp.ok) {
            console.log("Item added successfully");
          } else {
            throw new Error("Failed to add item to cart");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };
  const getTotalCartAmout = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
    // console.log(totalAmount);
  };

  const contextValue = {
    all_products,
    cartItem,
    addTocart,
    removeTocart,
    getTotalCartAmout,
    getTotalCartItem,
  };
  return (
    <shopContext.Provider value={contextValue}>
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
