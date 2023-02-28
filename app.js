const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const expressLayouts = require("express-ejs-layouts");

// const bcrypt = require("bcrypt");

const indexRoute= require("./routes/index");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const twoRoute = require("./routes/2");
const adminRoute = require("./routes/admin");
/*
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
*/

// setting 'ejs' as template engine
app.set("view engine", "ejs");

// set the path our 'views' are going to be coming from
app.set("views", __dirname + "/views");

// layout (to not duplicate frequently used HTML elements such as header and footer)
// app.set("layout", "layouts/layout");
// app.use(expressLayouts);

// getting information from 'form' element
app.use(express.urlencoded({ extended: false }));

// GET /styles.css, images and js files
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DataBase connection successfull !"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/2", twoRoute);
app.use("/admin", adminRoute);
/*
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
*/
// routes
/*
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/2", (req, res) => {
  res.render("2");
});

app.get("/cart", (req, res) => {
  res.render("cart");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch {}
  req.body.name;
});


// to handle not found page
app.use((req, res) => {
  res.status(404).send(`Sorry can't find that !`);
});
*/

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running!");
});
