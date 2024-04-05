const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const { emit } = require("process");
// const env = require("dotenv");

app.use(express.json());
app.use(cors());

// database connection
mongoose.connect(
  "mongodb+srv://hanzlazahid76:mxybjPKwhOXHo9ZY@cluster0.6glpesj.mongodb.net/"
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

app.use("/images", express.static("upload/images"));

// Image Storage Engine

const Storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()} ${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: Storage });
app.post("/upload", upload.single("product"), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } catch (err) {
    res.json(err);
  }
});

// creating Schema
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    // require: true,
  },
  name: {
    type: String,
    // require: true,
  },
  image: {
    type: String,
    // require: true,
  },
  category: {
    type: String,
    // require: true,
  },
  new_price: {
    type: Number,
    // require: true,
  },
  old_price: {
    type: Number,
    // require: true,
  },
  date: {
    type: Date,
    // require: true,
  },
  available: {
    type: Boolean,
    // require: true,
  },
});

app.post("/addproduct", async (req, res, next) => {
  const products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = await Product.create({
    id: id,
    ...req.body,
  });
  console.log(product);
  console.log("save");
  res.status(200).json({
    success: true,
    name: req.body.name,
    // data: product,
  });
});

// creating end point for deleting product
// app.post("/removeproduct", async (req, res, next) => {
//   await Product.findByIdAndDelete(req.body.id);
//   console.log("removed");
//   res.status(200).json({
//     success: true,
//     name: req.body.name,
//   });
// });

// get all product
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("all product fetch", products);
    res.send(products);
  } catch (err) {
    res.json(err);
  }
});

// schema creatign for user model
const User = mongoose.model("user", {
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
// Creating endpoint for registration user
app.post("/signup", async (req, res, next) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    res.status(400).json({
      success: true,
      errors: "Exisiting already with this email",
    });
  }
  const cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartdata: cart,
  });

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ ecom");
  res.status(200).json({
    success: true,
    token: token,
  });
});

// creating end point for user login
app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      const passComp = req.body.password === user.password;

      if (passComp) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(data, "secret_ ecom");

        res.status(200).json({
          success: true,
          token,
          isNewUser: false, // This flag indicates it's not a new signup
        });
      } else {
        res.status(400).json({
          success: false,
          errors: "Wrong password",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        errors: "User not found", // Changed from "User Found"
        isNewUser: false, // This flag indicates it's not a new signup
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      errors: "Internal server error",
    });
  }

  // try {
  //   let user = await User.findOne({ email: req.body.email });

  //   if (user) {
  //     const passComp = req.body.password === user.password;

  //     if (passComp) {
  //       const data = {
  //         user: {
  //           id: user.id,
  //         },
  //       };
  //       const token = jwt.sign(data, "secret_ecom");

  //       res.status(200).json({
  //         success: true,
  //         token,
  //       });
  //     } else {
  //       res.status(400).json({
  //         success: false,
  //         errors: "Wrong password",
  //       });
  //     }
  //   } else {
  //     res.status(400).json({
  //       success: false,
  //       errors: "User Found",
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     success: false,
  //     errors: "Internal server error",
  //   });
  // }
});

// creating endpoints for new collection
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newcollection fetched");
  res.send(newcollection);
});

//creating endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("popular in women fetch");
  res.send(popularinwomen);
});

// creating middleware to fetch user

// const fetchUser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   console.log(token);
//   if (!token) {
//     res.status(201).send({
//       errors: "Please authenticcate using valid token",
//     });
//   } else {
//     const data = jwt.verify(token, "secret_ ecom");
//     req.user = data.user;
//     next();

//     // catch (err) {
//     //   res.status(401).json({ errors: "Please authenticate using valid user" });
//     // }
//   }
// };

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    res.status(401).send({
      errors: "Please authenticate using a valid token",
    });
  } else {
    const data = jwt.verify(token, "secret_ ecom");
    req.user = data.user;
    next();
  }
};

// creating endpoint for adding products in card data
// app.post("/addtocart", fetchUser, async (req, res) => {
//   console.log(req.body, req.user);

//   let userData = await User.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await User.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );
//   res.send("Added");
// });
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);

  let userData = await User.findOne({ _id: req.user.id });
  let updatedCartData = { ...userData.cartData };
  updatedCartData[req.body.itemId] =
    (updatedCartData[req.body.itemId] || 0) + 1;

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: updatedCartData }
  );

  res.send("Added");
});

// app.post("/removefromcart", fetchUser, async (req, res) => {
//   console.log(req.body, req.user);

//   let userData = await User.findOne({ _id: req.user.id });
//   let updatedCartData = { ...userData.cartData };
//   updatedCartData[req.body.itemId] =
//     (updatedCartData[req.body.itemId] || 0) - 1;

//   await User.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: updatedCartData }
//   );

//   res.send("Added");
// });
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const itemId = req.body.itemId;
    console.log(req.body, req.user);

    // Find the user by ID
    let user = await User.findOne({ _id: req.user.id });

    // Check if the item exists in the cart
    if (user.cartData[itemId]) {
      // If the item exists, decrement its quantity
      user.cartData[itemId] -= 1;
      // If the quantity becomes zero, remove the item from the cart
      if (user.cartData[itemId] === 0) {
        delete user.cartData[itemId];
      }
      // Save the updated user document
      await user.save();

      res.send("Item removed from cart successfully");
    } else {
      // If the item does not exist in the cart, send an error response
      res.status(404).send("Item not found in cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send("Internal Server Error");
  }
});

// creating endpoint to get cartdata
app,
  post("/getcart", fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  });

app.listen(port, (err) => {
  if (err) {
    console.log("ERROR : " + err);
  }
  console.log(`Server is running on port : ${port}`);
});
