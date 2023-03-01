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
//const twoRoute = require("./routes/2");
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
app.use('/public', express.static("public"));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));


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
//app.use("/2", twoRoute);
app.use("/admin", adminRoute);
/*
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
*/


// to handle not found page
app.use((req, res) => {
  res.status(404).send(`Sorry can't find that !`);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running!");
});
