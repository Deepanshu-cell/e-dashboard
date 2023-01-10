const express = require("express");
const app = express();
const Product = require("./db/Products");
const User = require("./db/User");
require("./db/config");
const cors = require("cors"); // *** cors extension of npm to avoid cors error
const jwt = require("jsonwebtoken");
const jwtKey = "e-commerce";
const Cart = require("./db/Cart");
const path = require("path");

app.use(express.json()); // middleware to parse json request body
app.use(cors()); // ***In order to avoid cors

const PORT = process.env.PORT || 5000;

// signup api
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  if (result) {
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send("something went wrong please try again after sometime");
      }
      res.send({ result, auth: token });
    });
  }
});

// login api
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("something went wrong please try again after sometime");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

// add product api
app.post("/add-product", verifyToken, async (req, res) => {
  const product = new Product(req.body);
  let result = await product.save();
  setTimeout(() => {
    res.send(result);
  }, 2000);
});

// get list of products
app.get("/products", verifyToken, async (req, res) => {
  const products = await Product.find();
  setTimeout(() => {
    if (products.length) {
      res.send(products);
    } else {
      res.send({ result: "No product found" });
    }
  }, 2000);
});

// delete product
app.delete("/product/:_id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne(req.params);
  res.send(result);
});

// update product
app.put("/product/:_id", verifyToken, async (req, res) => {
  const result = await Product.updateOne(req.params, { $set: req.body });
  setTimeout(() => {
    res.send(result);
  }, 2000);
});

// search api
app.get("/search/:key", verifyToken, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });

  res.send(result);
});

app.get("/search", verifyToken, async (req, res) => {
  const result = await Product.find();
  res.send(result);
});

// middleware to verify jwt token
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    next();
  } else {
    res.send({ result: "Please add token with headers" });
  }
}

// cart api****************
// adding products to cart
app.post("/add-cart", async (req, res) => {
  const cart = new Cart(req.body);
  const result = await cart.save();
  res.send(result);
});

// getting cart products
app.get("/cart-products", async (req, res) => {
  const cartProducts = await Cart.find();
  return res.send(cartProducts);
});

// deleting products from cart
app.delete("/cart-products/:Id", async (req, res) => {
  const result = await Cart.deleteOne({ _id: req.params.Id });
  res.send(result);
});

// updating cart product quantity
app.put("/cart-products/:Id", async (req, res) => {
  const result = await Cart.updateMany(req.params, { $set: req.body });
  res.send(result);
});

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    app.use(express.static("front-end/build"));
    res.sendFile("front-end/build/index.html");
  });
}

app.listen(PORT);
