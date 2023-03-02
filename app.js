const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const indexRoute = require("./routes/index");
const adminRoute = require("./routes/admin")
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

// setting 'ejs' as template engine
app.set("view engine", "ejs");

// set the path our 'views' are going to be coming from
app.set("views", __dirname + "/views");


// body parser to get information from 'form' element
app.use(express.urlencoded({ extended: false }));

// GET /styles.css, images and js files
app.use('/public', express.static("public"));
app.use(express.static("public"));

// To use multer for uploading files to database (images)
app.use("/uploads", express.static("uploads"));

// Connect to Mongodb
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
app.use("/admin", adminRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);


// To handle not found page
app.use((req, res) => {
  res.status(404).send(`Sorry can't find that !`);
});




app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running...");
});
